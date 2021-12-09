import { StrategyName } from "@domain/protocols/strategy";
import { Request, Response } from "express";

export default async function strategies(_req: Request, res: Response): Promise<void> {
  const strategies: StrategyName[] = ["greenblatt", "bazin", "custom", "marciorasf", "onlyEbit"];
  res.status(200).json(strategies);
}
