import pool from "../config/db.js";

export default async function findToken(address) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            "SELECT * FROM token WHERE address = $1",
            [address]
        );

        return result.rows[0] || null;
    } catch (err) {
        console.error("Error fetching token:", err);
        throw err;
    } finally {
        client.release();
    }
}
