import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  salt_round: process.env.BCRYPT_SALT_ROUND,
  token: process.env.JWT_TOKEN,
  refreshtoken: process.env.JWT_REFESHREFRESH,
  tokenexpires: process.env.JWT_EXPIRESIN,
  refreshtokenexpires: process.env.JWT_REFRESTEXPIRESIN,
};
