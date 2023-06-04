import { config } from "dotenv";
import express from "express";
const app = express();
config();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("The sedulous hyena ate the antelope!");
});
app.get("/info", (req, res) => {
    res.send("The info");
});
app.listen(port, () => {
    return console.log(`server is listening on http://localhost:${port}`);
});
