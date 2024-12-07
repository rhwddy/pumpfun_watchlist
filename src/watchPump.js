import WebSocket from "ws";
import isUriBlocked from "./utils/isUriBlocked.js";

export default function watchPump() {
    const ws = new WebSocket("wss://pumpportal.fun/api/data");

    ws.on("open", function open() {
        const payload = {
            method: "subscribeNewToken",
        };
        ws.send(JSON.stringify(payload));
        console.log("WebSocket connection opened and subscription sent.");
    });

    ws.on("message", function message(data) {
        data = JSON.parse(data);
        console.log("Received message:", data);
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed.");
    });

    ws.on("error", (err) => {
        console.error("WebSocket error:", err);
    });

    process.on("SIGINT", () => {
        ws.close();
    });
}
