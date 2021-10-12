import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { PORT } from "@config/env";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (_req, res) {
  res.send("<h2>Hello from B3-Magical-Formula</h2>");
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
