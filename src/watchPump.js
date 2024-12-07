import WebSocket from "ws";
import getAllWallets from "./queries/getAllWallets.js";
import getAllTokens from "./queries/getAllTokens.js";

const pumpWs = new WebSocket("wss://pumpportal.fun/api/data");

const wallets = await getAllWallets();
const tokens = await getAllTokens();

pumpWs.on("open", function open() {
    console.log("WebSocket connection established.");
    pumpWs.send(
        JSON.stringify({
            method: "subscribeAccountTrade",
            keys: wallets,
        })
    );

    pumpWs.send(
        JSON.stringify({
            method: "subscribeTokenTrade",
            keys: tokens,
        })
    );
    console.log(
        `subscribed to ${wallets.length} wallets and ${tokens.length} tokens`
    );
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
