import addChannel from "../queries/addChannel.js";
import addChannelWallet from "../queries/addChannelWallet.js";
import addWallet from "../queries/addWallet.js";
import pumpWs from "../watchPump.js";

const followWalletData = {
    name: "follow-wallet",
    description:
        "Follow a wallet address to get notified when it makes a transaction.",
    options: [
        {
            name: "address",
            type: 3,
            description: "The wallet address to follow.",
            required: true,
        },
        {
            name: "name",
            type: 3,
            description: "How do you want to call it.",
            required: true,
        },
    ],
};

async function followWalletExecute(interaction) {
    const address = interaction.options.getString("address");
    const name = interaction.options.getString("name");

    try {
        const [channel, wallet] = await Promise.all([
            addChannel(interaction.channelId),
            addWallet(address, name),
        ]);
        await addChannelWallet(channel.id, wallet.id);
        pumpWs.send(
            JSON.stringify({
                method: "subscribeAccountTrade",
                keys: [wallet.address],
            })
        );
        await interaction.reply(`Following wallet address: ${address}`);
    } catch (error) {
        await interaction.reply("Error following wallet");
        return;
    }
}

export { followWalletExecute, followWalletData };
