import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";

import "@/mongo";
import "@/cron";
import { PORT } from "@config/env";
import handlers from "@/rest";

const app = setupRoutes(addMiddlewares(express()))

app.listen(PORT, () => {
  console.info(`Server started on port: ${PORT}`);
});

// Exit on docker stop
process.on("SIGTERM", () => {
  process.exit(0);
});


function addMiddlewares(app: Express): Express {
  app.use(cors({ origin: true, credentials: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app
}

function setupRoutes(app: Express): Express {
  app.post("/import", handlers.forceImport);
  app.get("/last-import", handlers.lastImport);
  app.post("/ranking", handlers.ranking);
  app.post("/find", handlers.find);
  app.get("/strategies", handlers.strategies);
  app.get("*", function (_req, res) {
    res.send("<h2>Hello from B3 Ranking</h2>");
  });

  return app
}
