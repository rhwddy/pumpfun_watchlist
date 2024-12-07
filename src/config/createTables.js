import pool from "./db.js";

export default async function createTables() {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const migrationQuery = `
      CREATE TABLE IF NOT EXISTS wallet (
          id SERIAL PRIMARY KEY,    
          address VARCHAR(255) UNIQUE NOT NULL   
      );

      CREATE TABLE IF NOT EXISTS token (
          id SERIAL PRIMARY KEY,    
          address VARCHAR(255) UNIQUE NOT NULL   
      );

      CREATE TABLE IF NOT EXISTS channel (
          id SERIAL PRIMARY KEY,    
          message_to VARCHAR(255) NOT NULL  
      );

      CREATE TABLE IF NOT EXISTS wallet_channel (
          wallet_id INT REFERENCES wallet(id) ON DELETE CASCADE,    
          channel_id INT REFERENCES channel(id) ON DELETE CASCADE,
          PRIMARY KEY (wallet_id, channel_id)   
      );

      CREATE TABLE IF NOT EXISTS token_channel (
          token_id INT REFERENCES token(id) ON DELETE CASCADE,    
          channel_id INT REFERENCES channel(id) ON DELETE CASCADE,  
          PRIMARY KEY (token_id, channel_id)    
      );

      CREATE INDEX IF NOT EXISTS idx_wallet_channel_wallet_id ON wallet_channel(wallet_id);
      CREATE INDEX IF NOT EXISTS idx_wallet_channel_channel_id ON wallet_channel(channel_id);
      CREATE INDEX IF NOT EXISTS idx_token_channel_token_id ON token_channel(token_id);
      CREATE INDEX IF NOT EXISTS idx_token_channel_channel_id ON token_channel(channel_id);
    `;

        await client.query(migrationQuery);

        await client.query("COMMIT");
        console.log("Migration executed successfully!");
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Error executing migration:", err);
    } finally {
        client.release();
    }
}
