import pkg from "pg";
import env from "dotenv";
const { Pool } = pkg;
env.config();
const pool = new Pool({
  user: process.env.NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
    process.exit(-1);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      console.error("Error executing query", err.stack);
      process.exit(-1);
    }
    console.log("Connected to PostgreSQL database");
  });
});

export default pool;