import { Strategy, StrategyName } from "../types/strategy";
import bazin from "./bazin";
import marciorasf from "./marciorasf";
import onlyEbit from "./only-ebit";

const strategies: Record<StrategyName, Strategy> = {
  marciorasf,
  bazin,
  onlyEbit,
};

export default function getStrategyConfig(strategyName: StrategyName): Strategy {
  return strategies[strategyName];
}
