import { getTokenChannels } from "./queries/getTokenChannels.js";
import { getWalletChannels } from "./queries/getWalletChannels.js";
import {
    tokenTransaction,
    walletTransaction,
    walletCreatedToken,
} from "./discordMessageFunctions/index.js";
import discordClient from "./discord.js";

export default async function sendDiscordMessage(data) {
    const {
        mint,
        traderPublicKey,
        txType,
        tokenAmount,
        vTokensInBondingCurve,
        vSolInBondingCurve,
    } = data;

    const tokenPriceSol = vSolInBondingCurve / vTokensInBondingCurve;
    const transactionSolValue = tokenAmount * tokenPriceSol;

    const tokenChannels = await getTokenChannels(mint);
    const walletChannels = await getWalletChannels(traderPublicKey);

    const filteredTokenChannels = tokenChannels.filter(
        (tokenChannel) =>
            !walletChannels.some(
                (walletChannel) =>
                    walletChannel.message_to === tokenChannel.message_to
            )
    );

    if (txType === "create") {
        walletChannels.forEach((channel) => {
            const channelClient = discordClient.channels.cache.get(
                channel.message_to
            );
            channelClient.send(walletCreatedToken(data, channel));
        });
    } else if (transactionSolValue > 0.05) {
        walletChannels.forEach((channel) => {
            const channelClient = discordClient.channels.cache.get(
                channel.message_to
            );
            channelClient.send(walletTransaction(data, channel));
        });
        filteredTokenChannels.forEach((channel) => {
            const channelClient = discordClient.channels.cache.get(
                channel.message_to
            );
            channelClient.send(tokenTransaction(data, channel));
        });
    }
}
