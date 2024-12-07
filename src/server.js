import express from "express";
import watchPump from "./watchPump.js";

const app = express();
const port = 3000;

watchPump();

app.get("/", (req, res) => {
    res.send("sex");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
