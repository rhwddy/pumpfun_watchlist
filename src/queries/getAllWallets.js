import pool from "../config/db.js";

export default async function getAllWallets() {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT address FROM wallet");

        return result.rows.map(({ address }) => address);
    } catch (err) {
        console.error("Error fetching wallets:", err);
        throw err;
    } finally {
        client.release();
    }
}
