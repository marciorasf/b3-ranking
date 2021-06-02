import dotenv from "dotenv";

dotenv.config();

export const IS_DEV = process.env.NODE_ENV === "development";

export const PORT = process.env.PORT || 3333;
