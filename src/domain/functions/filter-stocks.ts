import Stock from "@domain/protocols/stock";
import { Indicator } from "@domain/protocols/stock-indicators";

type FilterOptions = {
  min?: number;
  max?: number;
  exists?: true;
};

export type Filters = Partial<Record<Indicator, FilterOptions>>;

export default function filterStocks(stocks: Stock[], filters: Filters) {
  let filteredStocks = stocks;
  Object.entries(filters).forEach((entry) => {
    const indicator = entry[0] as Indicator;
    const filter = entry[1] as FilterOptions;

    filteredStocks = filteredStocks.filter((stock) => {
      const indicatorValue = stock.indicatorsValues[indicator];

      if (!indicatorValue) {
        return false;
      }

      if (filter.min !== undefined && indicatorValue < filter.min) {
        return false;
      }

      if (filter.max !== undefined && indicatorValue > filter.max) {
        return false;
      }

      return true;
    });
  });

  return filteredStocks;
}
