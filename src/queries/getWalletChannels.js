import pool from "../config/db.js";

export async function getWalletChannels(walletAddress) {
    const client = await pool.connect();
    try {
        const query = `
            SELECT
                c.id AS channel_id,
                c.message_to,
                w.address,
                w.name
            FROM 
                wallet_channel wc
            JOIN 
                channel c ON wc.channel_id = c.id
            JOIN 
                wallet w ON wc.wallet_id = w.id
            WHERE 
                w.address = $1;
        `;

        const result = await client.query(query, [walletAddress]);
        return result.rows;
    } catch (err) {
        console.error("Error fetching wallet channels by address:", err);
        throw err;
    } finally {
        client.release();
    }
}
