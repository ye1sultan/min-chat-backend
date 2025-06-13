const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 3000;
const clients = new Map(); // ws -> { name: 'Bob' | 'Alice' }

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Mini Chat Backend is running");
});

wss.on("connection", (ws) => {
	console.log("🔌 New client connected");

	ws.on("message", (data) => {
		try {
			const message = JSON.parse(data);

			if (message.type === "login") {
				// { type: "login", name: "Bob" }
				clients.set(ws, { name: message.name });
				console.log(`✅ ${message.name} logged in`);
				return;
			}

			if (message.type === "message") {
				console.log(`💬 ${message.from} ➝ ${message.to}: ${message.text}`);

				for (const [client, info] of clients.entries()) {
					const isRecipient = info.name === message.to;
					const isSender = info.name === message.from;

					if ((isRecipient || isSender) && client.readyState === 1) {
						client.send(
							JSON.stringify({
								type: "message",
								from: message.from,
								text: message.text,
							})
						);
					}
				}
			}

			if (message.type === "read") {
				console.log(`🔍 ${message.from} read message from ${message.to}`);

				for (const [client, info] of clients.entries()) {
					const isRecipient = info.name === message.to;
					const isSender = info.name === message.from;

					if ((isRecipient || isSender) && client.readyState === 1) {
						client.send(
							JSON.stringify({
								type: "read",
								from: message.from,
								to: message.to,
								read: true
							})
						);
					}
				}
			}

		} catch (err) {
			console.error("❌ Error parsing message:", err);
		}
	});

	ws.on("close", () => {
		const info = clients.get(ws);
		if (info) {
			console.log(`🔌 ${info.name} disconnected`);
			clients.delete(ws);
		}
	});
});

server.listen(PORT, () => {
	console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
