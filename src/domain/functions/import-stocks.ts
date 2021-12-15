/* eslint-disable no-await-in-loop */
import { StocksImportModel } from "@domain/entities/stocks-import";
import getStockIndicatorsFromStatusInvest from "@domain/functions/get-stock-indicators-from-status-invest";
import getStocksCodes from "@domain/functions/get-stocks-codes";
import Stock from "@domain/protocols/stock";

const IMPORT_FOLD_LENGTH = 20;

export default async function importStocks() {
  const availableStocks = await getStocksCodes();

  const nStocks = availableStocks.length;
  const importErrors: string[] = [];
  const stocks: Stock[] = [];

  const sliceLength = IMPORT_FOLD_LENGTH;
  const nFolds = Math.ceil(nStocks / sliceLength);
  let startIndex = 0;
  let endIndex = nFolds === 1 ? nStocks : sliceLength;

  console.info("Start importing stocks' indicators.");
  for (let foldIndex = 0; foldIndex < nFolds; foldIndex += 1) {
    const foldStocks = availableStocks.slice(startIndex, endIndex);

    await Promise.all(
      foldStocks.map(async (stock) => {
        try {
          const indicators = await getStockIndicatorsFromStatusInvest(stock);
          stocks.push({
            code: stock,
            indicatorsValues: indicators,
          });
        } catch (err) {
          console.warn(`Error fetching ${stock}: ${err.message}`);
          importErrors.push(stock);
        }
      })
    );

    console.info(`Progress: ${endIndex}/${nStocks}`);
    startIndex += sliceLength;
    endIndex = foldIndex === nFolds - 2 ? nStocks : endIndex + sliceLength;
  }

  const newStocksImport = new StocksImportModel({
    stocks,
    importErrors,
  });

  console.info("Finished importing stocks' indicators.");

  await newStocksImport.save();
}
