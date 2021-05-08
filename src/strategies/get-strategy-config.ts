import { Strategy, StrategyName } from "../types/strategy";
import bazin from "./bazin";
import marciorasf from "./marciorasf";

const strategies: Record<StrategyName, Strategy> = {
  marciorasf,
  bazin,
};

export default function getStrategyConfig(strategyName: StrategyName): Strategy {
  return strategies[strategyName];
}
