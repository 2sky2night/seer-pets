import winston from "winston";
import dayjs from "dayjs";
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}][${level}][${dayjs(timestamp as number).format("YYYY-MM-DD HH:mm:ss:SSS")}]: ${message}`;
});

export const logger = winston.createLogger({
  level: "info", // 仅当 info.level 小于或等于此级别时才记录
  format: combine(
    label({ label: "task_get_pets" }),
    timestamp(),
    winston.format.colorize(),
    myFormat,
  ),
  /** transports 为传输通道。共有4中传输方式：控制台stdout、文件、http、Stream */
  transports: [
    new winston.transports.Console(), // 把日志输出到控制台
    new winston.transports.File({ filename: "combined.log" }), // 把日志输出到文件
  ],
});
