import express from "express";
import watchPump from "./watchPump.js";
import routes from "./routes/index.js";

const app = express();
const port = 3000;

watchPump();

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
