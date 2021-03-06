import { IS_DEV } from "@config/env";
import fs from "fs";

export default async function getStocksCodes(): Promise<string[]> {
  const file = IS_DEV ? "resources/stock_codes_dev.json" : "resources/stock_codes_custom.json";

  const rawFile = (await fs.promises.readFile(file)) as unknown as string;
  const availableStocks = JSON.parse(rawFile).stocks;
  return availableStocks;
}
