const weightsReducer = (accumulator: any, currentItem: any) =>
  accumulator + currentItem.weight;

const scoresReducer = (accumulator: any, currentScore: any) =>
  accumulator + currentScore;

export default function calculateScoresAndSort(
  stocks: any[],
  indicatorsAndWeights: any[],
  options: any
) {
  let stocksCopy = stocks.slice();
  const weightsSum = indicatorsAndWeights.reduce(weightsReducer, 0);

  stocksCopy.forEach((stock) => {
    const scoresPerIndicator = indicatorsAndWeights.map((item) => {
      return stock.ranking[item.indicator] * item.weight;
    });

    const score = scoresPerIndicator.reduce(scoresReducer, 0) / weightsSum;
    stock.score = score;
  });

  stocksCopy.sort((A, B) => A.score - B.score);

  if (options.filterSameEnterpriseStocks) {
    const alreadyListed: any[] = [];
    stocksCopy = stocksCopy.filter((stock) => {
      const stockCodeWithoutNumber = stock.code.slice(0, 4);
      if (alreadyListed.includes(stockCodeWithoutNumber)) {
        return false;
      }
      alreadyListed.push(stockCodeWithoutNumber);
      return true;
    });
  }

  stocksCopy.forEach((stock, index) => {
    stock.score_position = index + 1;
  });

  return stocksCopy;
}
