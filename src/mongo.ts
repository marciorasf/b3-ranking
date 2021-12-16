import mongoose from "mongoose";

import { connectionOptions, MONGO_URI } from "@config/mongo";

mongoose
  .connect(MONGO_URI, connectionOptions)
  .catch((err: any) => console.error(`Error while connecting with MongoDB: ${err}`));

mongoose.set("bufferCommands", false);

export default mongoose;
