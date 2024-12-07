import express from "express";
import watchPump from "./watchPump.js";
import routes from "./routes/index.js";
import createTables from "./config/createTables.js";

const app = express();
const port = 3000;

await createTables();

watchPump();

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
