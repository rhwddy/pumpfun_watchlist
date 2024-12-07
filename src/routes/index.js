import express from "express";
import addWallet from "../queries/addWallet.js";
import addToken from "../queries/addToken.js";
import getAllWallets from "../queries/getAllWallets.js";
import getAllTokens from "../queries/getAllTokens.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send("sex");
});

router.post("/wallet", async (req, res) => {
    const wallet = await addWallet(req.body.address);
    res.send(wallet);
});

router.post("/token", async (req, res) => {
    const token = await addToken(req.body.address);
    res.send(token);
});

router.get("/wallets", async (req, res) => {
    const wallets = await getAllWallets();
    res.send(wallets);
});

router.get("/tokens", async (req, res) => {
    const tokens = await getAllTokens();
    res.send(tokens);
});

export default router;
