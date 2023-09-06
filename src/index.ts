import { config } from "dotenv";
import express from "express";

const app = express();
config();

const port = 80;

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

app.get("/info", (req, res) => {
  res.send("The info");
});

app.get("/pupsik", (req, res) => {
  res.send("Эта страница показывает что пупсики рулят))");
});

app.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});
