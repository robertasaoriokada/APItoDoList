import express from "express";
import { config } from "dotenv";
config();
const app = express();
const port = process.env.PORT || 3333;

app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.listen(port, () => {
  console.log("Oi");
});
