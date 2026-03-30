import mongoose from "mongoose";
import { logger } from "../../utils/logger.js";

export const connectToMongo = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  logger.info("Connected to MongoDB");
};
