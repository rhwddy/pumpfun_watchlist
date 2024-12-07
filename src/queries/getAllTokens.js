import pool from "../config/db.js";

export default async function getAllTokens() {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT address FROM token");

        return result.rows.map(({ address }) => address);
    } catch (err) {
        console.error("Error fetching tokens:", err);
        throw err;
    } finally {
        client.release();
    }
}
