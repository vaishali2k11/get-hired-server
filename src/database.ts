
// src\database.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log('process.env.DATABASE_URL:', process.env.DATABASE_URL)
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export const databaseConnection = () => {
    db.connect()
      .then(() => console.log("✅ Database initialized in server.ts"))
      .catch((err) => console.error("❌ DB Connection Error:", err));
}

export default db;