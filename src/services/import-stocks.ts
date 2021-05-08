/* eslint-disable no-await-in-loop */
import { __import_fold_length__ } from "../config/env";
import { StocksImportModel } from "../entities/stocks-import";
import Stock from "../types/stock";
import getStockIndicatorsFromStatusInvest from "./get-stock-indicators-from-status-invest";
import getStocksCodes from "./get-stocks-codes";

export default async function importStocks() {
  const availableStocks = await getStocksCodes();

  const nStocks = availableStocks.length;
  const importErrors: string[] = [];
  const stocks: Stock[] = [];

  const sliceLength = __import_fold_length__;
  const nFolds = Math.ceil(nStocks / sliceLength);
  let startIndex = 0;
  let endIndex = nFolds === 1 ? nStocks : sliceLength;

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
          console.log(err.message);
          importErrors.push(stock);
        }
      })
    );

    console.log(`${endIndex}/${nStocks}`);
    startIndex += sliceLength;
    endIndex = foldIndex === nFolds - 2 ? nStocks : endIndex + sliceLength;
  }

  const newStocksImport = new StocksImportModel({
    stocks,
    importErrors,
  });

  await newStocksImport.save();
}
