import { IndicatorsWeights } from "../functions/calculate-scores";
import { Filters } from "../functions/filter-stocks";

export type StrategyName = "marciorasf" | "bazin" | "onlyEbit";

export type Strategy = {
  filters: Filters;
  rankingWeights: IndicatorsWeights;
};
