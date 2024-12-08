import express from "express";
import routes from "./routes/index.js";
import createTables from "./config/createTables.js";
import cors from "cors";
import pool from "./config/db.js";
import pumpWs from "./watchPump.js";
import discordClient from "./discord.js";

const app = express();
const port = 3000;

await createTables();

pumpWs;

discordClient;

app.use(cors());

app.use(express.json());

app.use("/", routes);

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

process.on("SIGINT", async () => {
    console.log("\n");
    console.log("Shutting down...");
    pool.end();
    pumpWs.close();
    server.close();
    console.log("gracefully shut down.");
    process.exit(0);
});
