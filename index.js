const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// BAD: Hardcoded credentials (security vulnerability)
const API_KEY = "sk_test_1234567890abcdef";
const PASSWORD = "admin123";
var admin_token = "hardcoded_secret_token";

const PORT = 3000;
const clients = new Map();

// BAD: Unused variable (code smell)
var unusedVariable = "this will never be used";
var anotherUnused = 123;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Mini Chat Backend is running");
});

// BAD: Dangerous eval() usage (security vulnerability)
app.post("/eval", (req, res) => {
	var result = eval(req.body.code);  // Critical security issue
	res.json({ result: result });
});

// BAD: Cognitive complexity - deeply nested conditions
function processComplexLogic(a, b, c, d, e) {
	if (a > 0) {
		if (b > 0) {
			if (c > 0) {
				if (d > 0) {
					if (e > 0) {
						return a + b + c + d + e;
					} else {
						return a + b + c + d;
					}
				} else {
					return a + b + c;
				}
			} else {
				return a + b;
			}
		} else {
			return a;
		}
	} else {
		return 0;
	}
}

// BAD: Code duplication
function calculateTotal1(items) {
	var total = 0;
	for (var i = 0; i < items.length; i++) {
		total = total + items[i];
	}
	return total;
}

function calculateTotal2(items) {
	var total = 0;
	for (var i = 0; i < items.length; i++) {
		total = total + items[i];
	}
	return total;
}

function calculateTotal3(items) {
	var total = 0;
	for (var i = 0; i < items.length; i++) {
		total = total + items[i];
	}
	return total;
}

wss.on("connection", (ws) => {
	console.log("🔌 New client connected");

	ws.on("message", (data) => {
		try {
			const message = JSON.parse(data);

			// BAD: Using == instead of === (type coercion bug)
			if (message.type == "login") {
				clients.set(ws, { name: message.name });
				console.log(`✅ ${message.name} logged in`);
				return;
			}

			// BAD: Magic numbers without explanation
			if (message.text && message.text.length > 500) {
				console.log("Message too long");
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
			// BAD: Empty catch block (swallowing errors)
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
