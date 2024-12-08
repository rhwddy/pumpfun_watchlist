import addChannel from "../queries/addChannel.js";
import addChannelToken from "../queries/addChannelToken.js";
import addToken from "../queries/addToken.js";
import pumpWs from "../watchPump.js";

const followTokenData = {
    name: "follow-token",
    description: "Follow a token ca to get notified when it is traded.",
    options: [
        {
            name: "ca",
            type: 3,
            description: "The token ca to follow",
            required: true,
        },
    ],
};

async function followTokenExecute(interaction) {
    const address = interaction.options.getString("ca");

    try {
        const [channel, token] = await Promise.all([
            addChannel(interaction.channelId),
            addToken(address),
        ]);

        await addChannelToken(channel.id, token.id);
        pumpWs.send(
            JSON.stringify({
                method: "subscribeTokenTrade",
                keys: [token.address],
            })
        );
        await interaction.reply(`Following token ca: ${address}`);
    } catch (error) {
        console.error(error);
        await interaction.reply("Error following token");
        return;
    }
}

export { followTokenExecute, followTokenData };
