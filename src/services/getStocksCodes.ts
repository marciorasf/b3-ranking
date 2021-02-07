import fs from "fs";

import { __dev__ } from "../config/env";

export default async function getStocksCodes(): Promise<string[]> {
  const file = __dev__
    ? "resources/stocks_codes_dev.json"
    : "resources/stocks_codes.json";

  const rawFile = ((await fs.promises.readFile(file)) as unknown) as string;
  const availableStocks = JSON.parse(rawFile).stocks;
  return availableStocks;
}
