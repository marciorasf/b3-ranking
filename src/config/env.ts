import dotenv from "dotenv";

dotenv.config();

export const __dev__ = process.env.NODE_ENV === "development";

export const __port__ = process.env.PORT || 3333;

export const __import_fold_length__ = 20;
