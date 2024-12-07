import pool from "../config/db.js";

export default async function addToken(address) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `WITH ins AS (
              INSERT INTO token (address)
              VALUES ($1)
              ON CONFLICT (address) DO NOTHING
              RETURNING *
            )
            SELECT * FROM ins
            UNION
            SELECT * FROM token
            WHERE address = $1
            LIMIT 1;`,
            [address]
        );

        return result.rows[0];
    } catch (err) {
        console.error("Error adding token:", err);
    } finally {
        client.release();
    }
}
