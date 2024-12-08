import { getTokenChannels } from "./queries/getTokenChannels.js";
import { getWalletChannels } from "./queries/getWalletChannels.js";
import {
    tokenTransaction,
    walletTransaction,
    walletCreatedToken,
} from "./discordMessageFunctions/index.js";
import discordClient from "./discord.js";

export default async function sendDiscordMessage(data) {
    const tokenChannels = await getTokenChannels(data.mint);
    const walletChannels = await getWalletChannels(data.traderPublicKey);

    // removing duplicates from tokenChannels
    const filteredTokenChannels = tokenChannels.filter(
        (tokenChannel) =>
            !walletChannels.some(
                (walletChannel) =>
                    walletChannel.message_to === tokenChannel.message_to
            )
    );

    if (data.txType === "create") {
        walletChannels.forEach((channel) => {
            const channelClient = discordClient.channels.cache.get(
                channel.message_to
            );
            channelClient.send(walletCreatedToken(data, channel));
        });
    } else {
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
