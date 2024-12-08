import WebSocket from "ws";
import initializeWalletsAndTokensWs from "./serverFunctions/initializeWalletsAndTokensWs.js";
import sendDiscordMessage from "./sendDiscordMessage.js";

const pumpWs = new WebSocket("wss://pumpportal.fun/api/data");

pumpWs.on("open", async function open() {
    console.log("WebSocket connection established.");
    await initializeWalletsAndTokensWs(pumpWs);
});

pumpWs.on("close", () => {
    console.log("WebSocket connection closed.");
});

pumpWs.on("error", (err) => {
    console.error("WebSocket error:", err);
});

pumpWs.on("message", async (data) => {
    data = JSON.parse(data);
    if (data.txType) {
        await sendDiscordMessage(data);
    } else {
        console.log("Received data:", data);
    }
});

export default pumpWs;
