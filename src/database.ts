
// src\database.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log(' process.env.DATABASE_USERNAME:',  process.env.DATABASE_USERNAME)
console.log('process.env.DATABASE_HOST:', process.env.DATABASE_HOST)
const db = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT) || 5432,
});

export const databaseConnection = () => {
    db.connect()
      .then(() => console.log("✅ Database initialized in server.ts"))
      .catch((err) => console.error("❌ DB Connection Error:", err));
}

export default db;