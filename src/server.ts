import mongoose from "mongoose";
import { Server } from "http";
import config from "./config";
import app from "./app";
import { errorLogger, Logger } from "./shared/logger";

let server: Server;

async function Bootstrap() {
  try {
    await mongoose.connect(config.databaseUrl as string);

    Logger.info("Database connected successfully");

    app.listen(config.port, () => {
      console.log(`apps running at http://localhost:${config.port}`);
    });
  } catch (error) {
    errorLogger.error("Database running failed", error);
  }

  process.on("ünhandle Rejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
Bootstrap();
process.on("Sigterm", () => {
  console.log("sigterm is recived....");
  if (server) {
    server.close();
  }
});
