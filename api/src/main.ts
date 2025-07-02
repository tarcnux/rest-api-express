import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Aloha mundo!");
});
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
app.get("/status", (req, res) => {
  res.status(200).send("Server is running");
});
app.get("/version", (req, res) => {
  res.status(200).send("Version 1.0.0");
});
app.get("/info", (req, res) => {
  res.status(200).json({
    name: "Express Server",
    version: "1.0.0",
    description: "A simple Express server",
  });
});
app.get("/config", (req, res) => {
  res.status(200).json({
    port: PORT,
    environment: process.env.NODE_ENV || "development",
  });
});
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});
