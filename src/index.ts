import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import pg from "pg";

const app = express();

const pool = new pg.Pool({
  user: "test_owner",
  host: "ep-quiet-hill-a1yvcqaq.ap-southeast-1.aws.neon.tech",
  database: "test",
  password: "poDTu4ahCPU8",
  port: 5432,
  ssl: true,
});

app.use(bodyParser.json());
app.use(cors());
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

app.post("/users", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *",
    [firstName, lastName, email]
  );
  res.json(result.rows[0]);
});

app.listen(3001, () => {
  console.log("Server running on port 3001"); // Server listening on port 3001
});
