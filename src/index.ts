import path from "path";

import { config } from "dotenv";
import express from "express";

const app = express();
config();

const port = 80;

app.use("/", express.static(path.resolve("build")));

app.get("/info", (req, res) => {
  res.send("The info");
});

app.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});
