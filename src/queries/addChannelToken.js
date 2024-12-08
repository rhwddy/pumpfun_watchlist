import pool from "../config/db.js";

export default async function addChannelToken(channelId, tokenId) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            "INSERT INTO token_channel (channel_id, token_id) VALUES ($1, $2) RETURNING *",
            [channelId, tokenId]
        );

        return result.rows[0];
    } catch (err) {
        console.error("Error adding channel token:", err);
    } finally {
        client.release();
    }
}
