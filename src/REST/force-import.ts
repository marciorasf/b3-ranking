import { Request, Response } from "express";

import importStocks from "@domain/functions/import-stocks";

export default function forceImport(_req: Request, res: Response): void {
  importStocks();
  res.sendStatus(204);
}
