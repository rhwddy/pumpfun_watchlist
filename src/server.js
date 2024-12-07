import express from "express";
import watchPump from "./watchPump.js";
import routes from "./routes/index.js";
import createTables from "./config/createTables.js";
import cors from "cors";
import pool from "./config/db.js";

const app = express();
const port = 3000;

await createTables();

watchPump();
app.use(cors());

app.use(express.json());

app.use("/", routes);

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

process.on("SIGINT", async () => {
    console.log("Shutting down...");
    pool.end();
    server.close();
    console.log("gracefully shut down.");
    process.exit(0);
});
