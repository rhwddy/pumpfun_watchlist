import WebSocket from "ws";

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
        const parsedData = JSON.parse(data);
        console.log("New token:", parsedData);
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed.");
    });

    ws.on("error", (err) => {
        console.error("WebSocket error:", err);
    });
}
