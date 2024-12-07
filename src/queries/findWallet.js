import pool from "../config/db.js";

export default async function findWallet(address) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            "SELECT * FROM wallet WHERE address = $1",
            [address]
        );

        return result.rows[0] || null;
    } catch (err) {
        console.error("Error fetching wallet:", err);
        throw err;
    } finally {
        client.release();
    }
}
