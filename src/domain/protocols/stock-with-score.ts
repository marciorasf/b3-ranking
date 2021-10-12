import Stock from "@domain/protocols/stock";

export default class StockWithScore extends Stock {
  score!: number;
}
