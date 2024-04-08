const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${label} [${level}]: ${message}`;
});

const logsDir = "logs";
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logger = createLogger({
  level: "debug",
  format: combine(
    format.colorize(),
    label({ label: "dev" }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    myFormat
  ),
  transports: [
    new transports.File({
      level: "error",
      filename: path.join(logsDir, "error.log"),
      maxsize: 1048576,
      maxFiles: 5,
      tailable: true,
    }),
    new transports.File({
      filename: path.join(logsDir, "combined.log"),
      maxsize: 1048576,
      maxFiles: 5,
      tailable: true,
    }),
    new transports.Console(),
  ],
});

module.exports = logger;
