import express from "express";
import { configDotenv } from "dotenv";
import { filmes } from "./data/filmes.ts";
import type { Filme } from "./model/index.ts";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5173;

function cleanFields(filme: Filme, ignorar: string | undefined) {
  const ignoreFields = ignorar ? ignorar.toString().split(",") : [];
  const filmeCopy : Partial<Filme> = { ...filme };
  ignoreFields.forEach(
    (field: string) => {delete filmeCopy[field.trim() as keyof Filme]}
  );
  return filmeCopy;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//main routes
app.get("/filmes", (req, res) => {
  const { ignorar } = req.query as any;
  const cleanFilmes = filmes.map((filme: Filme) => cleanFields(filme, ignorar));
  res.status(200).json(cleanFilmes);
});

app.get("/filmes/ping", (req, res) => {
  console.log("GET /filmes/ping - Pong response sent");
  res.status(200).send('Pong');
});


app.get("/filmes/:id", (req, res) => {
  const { id } = req.params;
  const { ignorar } = req.query as any;
  
  const filme = filmes.find((f: Filme) => f.id === id);

  if (!filme) {
    res.status(404).json({ error: "Filme not found" });
    return;
  }
  
  res.status(200).json(cleanFields(filme, ignorar));
});

// Additional routes
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
