import { Client, Events, GatewayIntentBits, Routes } from "discord.js";
import dotenv from "dotenv";
import { REST } from "@discordjs/rest";
import {
    followWalletData,
    followWalletExecute,
} from "./discordCommands/followWallet.js";
import {
    followTokenData,
    followTokenExecute,
} from "./discordCommands/followToken.js";

dotenv.config();

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [followWalletData, followTokenData];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("Started refreshing global (/) commands.");

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        });

        const gaf = await rest.get(
            Routes.applicationCommands(process.env.CLIENT_ID)
        );

        console.log(gaf);

        console.log("Successfully reloaded global (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();

discordClient.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

discordClient.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "follow-wallet") {
        await followWalletExecute(interaction);
    }

    if (interaction.commandName === "follow-token") {
        await followTokenExecute(interaction);
    }
});

discordClient.login(process.env.DISCORD_TOKEN);

export default discordClient;
