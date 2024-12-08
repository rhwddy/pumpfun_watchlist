import pool from "../config/db.js";

export async function getTokenChannels(tokenAddress) {
    const client = await pool.connect();
    try {
        const query = `
            SELECT
                c.id AS channel_id,
                c.message_to
            FROM 
                token_channel tc
            JOIN 
                channel c ON tc.channel_id = c.id
            JOIN 
                token t ON tc.token_id = t.id
            WHERE 
                t.address = $1;
        `;

        const result = await client.query(query, [tokenAddress]);
        return result.rows;
    } catch (err) {
        console.error("Error fetching token channels by address:", err);
        throw err;
    } finally {
        client.release();
    }
}
