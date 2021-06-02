import mongoose from "mongoose";

import { connectionOptions, MONGO_URI } from "@config/mongo";

mongoose.connect(MONGO_URI, connectionOptions);

export default mongoose;
