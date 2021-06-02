import dotenv from "dotenv";

dotenv.config();

export const { MONGO_URI } = process.env;

export const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
