import { Request, Response } from "express";

import getLastImport from "@domain/functions/get-last-import";

export default async function lastImport(_req: Request, res: Response): Promise<void> {
  const result = await getLastImport();
  res.status(200).json(result);
}
