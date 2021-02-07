import { Document } from "mongoose";

import DailyImport from "../models/daily-import";

export default async function getLastImport(): Promise<Document<any> | null> {
  return DailyImport.findOne(
    {},
    {},
    {
      sort: { date: -1 },
    }
  );
}
