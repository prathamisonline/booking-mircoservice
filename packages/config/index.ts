import dotenv from "dotenv";
import path from "path";

// Load .env from the root of the project (assuming we are running from a service directory)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  dbUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "secret",
  nodeEnv: process.env.NODE_ENV || "development",
};
