import pool from "../config/db.js";

export default async function addChannelWallet(channelId, walletId) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            "INSERT INTO wallet_channel (channel_id, wallet_id) VALUES ($1, $2) RETURNING *",
            [channelId, walletId]
        );

        return result.rows[0];
    } catch (err) {
        console.error("Error adding channel wallet:", err);
    } finally {
        client.release();
    }
}
