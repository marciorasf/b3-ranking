import cron from "node-cron";

import importStocks from "@domain/functions/import-stocks";

// Import stocks every day at midnight.
cron.schedule("0 0 0 * * *", async () => {
  await importStocks();
});
