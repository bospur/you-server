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
app.use(express.json());

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

const urlencodedParser = express.urlencoded({ extended: false });

app.get("/api/purchase", (req, res) => {
  connection.query("SELECT * FROM purchase;", (err, result) => {
    res.send(result);
  });
});

app.post("/api/purchase", urlencodedParser, function (request, response) {
  const body = request.body;
  console.log(body);
  if (!body) return response.sendStatus(400);

  connection.query(
    `INSERT INTO purchase(category, amount)
    VALUES ('${body.category}', ${body.amount});`,
    (err, result) => {
      console.log(err);
      err && response.sendStatus(400);

      if (result) {
        response.send({
          message: "Запись успешно добавлена",
        });
      }
    }
  );
});

app.listen(PORT, () => {
  return console.log(`server is listening on http://localhost:${PORT}`);
});
