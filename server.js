const express = require("express");
const { WebSocketServer } = require("ws");
const http = require("http");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const PORT = process.env.PORT || 3000;

const clients = new Map();

const messages = {};

wss.on("connection", (ws) => {
    console.log("Client connected");

    let currentUserId = null;

    ws.on("message", (data) => {
        try {
            const parsed = JSON.parse(data);

            if (parsed.type === "init" && parsed.userId) {
                currentUserId = parsed.userId;
                clients.set(currentUserId, ws);
                console.log(`User ${currentUserId} connected`);

                const userMessages = messages[currentUserId] || [];
                ws.send(JSON.stringify({ type: "history", messages: userMessages }));
                return;
            }

            if (parsed.type === "message") {
                const { to, from, text, id, time } = parsed;

                const newMessage = { from, to, text, id, time, read: false };

                const chatId = [from, to].sort().join("_");
                messages[chatId] = [...(messages[chatId] || []), newMessage];

                const target = clients.get(to);
                if (target && target.readyState === ws.OPEN) {
                    target.send(JSON.stringify({ type: "message", ...newMessage }));
                }
            }

            if (parsed.type === "read") {
                const { chatId, messageId } = parsed;

                if (messages[chatId]) {
                    messages[chatId] = messages[chatId].map((msg) =>
                        msg.id === messageId ? { ...msg, read: true } : msg
                    );
                }

                const [user1, user2] = chatId.split("_");
                const recipient = user1 === currentUserId ? user2 : user1;
                const wsRecipient = clients.get(recipient);
                if (wsRecipient && wsRecipient.readyState === ws.OPEN) {
                    wsRecipient.send(
                        JSON.stringify({ type: "read", chatId, messageId })
                    );
                }
            }

        } catch (err) {
            console.error("Invalid message", err);
        }
    });

    ws.on("close", () => {
        console.log(`Client ${currentUserId} disconnected`);
        if (currentUserId) clients.delete(currentUserId);
    });
});

server.listen(PORT, () => {
    console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
