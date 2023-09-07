import path from "path";
import mysql from "mysql2";

import { config } from "dotenv";
import express from "express";

const app = express();
config();
const { PORT, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

app.use("/", express.static(path.resolve("../you-space/dist")));

app.get("/api/purchase", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  });

  connection.connect((err) => {
    if (err) return console.log(err);
  });

  connection.query("SELECT * FROM purchase", (err, result) => {
    res.send(result);
  });

  connection.end();
});

app.listen(PORT, () => {
  return console.log(`server is listening on http://localhost:${PORT}`);
});
