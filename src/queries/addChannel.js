import pool from "../config/db.js";

export default async function addChannel(message_to) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `WITH ins AS (
              INSERT INTO channel (message_to)
              VALUES ($1)
              ON CONFLICT (message_to) DO NOTHING
              RETURNING *
            )
            SELECT * FROM ins
            UNION
            SELECT * FROM channel
            WHERE message_to = $1
            LIMIT 1;`,
            [message_to]
        );

        return result.rows[0];
    } catch (err) {
        console.error("Error adding channel:", err);
    } finally {
        client.release();
    }
}
