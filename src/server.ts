import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import "@/mongo";
import "@/cron";
import { PORT } from "@config/env";
import handlers from "@/rest";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/import", handlers.forceImport);

app.get("/last-import", handlers.lastImport);

app.post("/ranking", handlers.ranking);

app.post("/find", handlers.find);

app.get("*", function (_req, res) {
  res.send("<h2>Hello from B3-Magical-Formula</h2>");
});

app.listen(PORT, () => {
  console.info(`Server started on port: ${PORT}`);
});

// Exit on docker stop
process.on("SIGINT", () => {
  process.exit(0);
});
