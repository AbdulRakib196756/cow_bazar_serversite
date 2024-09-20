import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const { combine, timestamp, label, printf } = format;

const myFormate = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${date.toDateString()}:${hour}:${min}:${sec} [${label}] ${level}:${message} `;
});

const Logger = createLogger({
  level: "info",
  format: combine(label({ label: "COW" }), timestamp(), myFormate),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "success",
        "[cow]-%Date%-success.log"
      ),
      datePattern: "YYYY-DD-MM-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
const errorLogger = createLogger({
  level: "error",
  format: combine(label({ label: "COW" }), timestamp(), myFormate),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "error",
        "[cow]-%Date%-error.log"
      ),
      datePattern: "YYYY-DD-MM-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export { Logger, errorLogger };
