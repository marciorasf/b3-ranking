import { IndicatorsWeights } from "@domain/functions/calculate-scores";
import { Filters } from "@domain/functions/filter-stocks";

export type StrategyName = "marciorasf" | "bazin" | "onlyEbit" | "custom";

export type Strategy = {
  filters: Filters;
  rankingWeights: IndicatorsWeights;
};
