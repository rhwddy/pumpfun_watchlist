import WebSocket from "ws";
import initializeWalletsAndTokensWs from "./serverFunctions/initializeWalletsAndTokensWs.js";

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

pumpWs.on("message", (data) => {
    data = JSON.parse(data);
    console.log(data);
});

export default pumpWs;
