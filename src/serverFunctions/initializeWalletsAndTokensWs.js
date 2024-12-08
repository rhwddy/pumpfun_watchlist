import getAllWallets from "../queries/getAllWallets.js";
import getAllTokens from "../queries/getAllTokens.js";

export default async function initializeWalletsAndTokensWs(ws) {
    const wallets = await getAllWallets();
    const tokens = await getAllTokens();

    ws.send(
        JSON.stringify({
            method: "subscribeAccountTrade",
            keys: wallets,
        })
    );

    ws.send(
        JSON.stringify({
            method: "subscribeTokenTrade",
            keys: tokens,
        })
    );
    console.log(
        `subscribed to ${wallets.length} wallets and ${tokens.length} tokens`
    );
}
