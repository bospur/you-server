import path from "path";
import mysql from "mysql2";
import cors from "cors";

import { config } from "dotenv";
import express from "express";

const app = express();
config();
const { PORT, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

app.use("/", express.static(path.resolve("../you-space/dist")));
app.use(
  cors({
    origin: "*",
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

const urlencodedParser = express.urlencoded({ extended: false });

app.get("/api/purchase", (req, res) => {
  connection.connect((err) => {
    if (err) return console.log(err);
  });

  connection.query("SELECT * FROM purchase", (err, result) => {
    res.send(result);
  });

  connection.end();
});

app.post("/purchase", urlencodedParser, function (request, response) {
  const body = request.body;
  if (!body) return response.sendStatus(400);
  connection.connect((err) => {
    if (err) return console.log(err);
  });

  connection.query(`INSERT INTO purchase(category, amount)
    VALUES (${body.category}, ${body.amount})`);

  response.send({
    message: "Запись успешно добавлена",
  });

  connection.end();
});

app.listen(PORT, () => {
  return console.log(`server is listening on http://localhost:${PORT}`);
});
