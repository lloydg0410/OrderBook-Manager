import winston from "winston";
import "winston-daily-rotate-file";
import { LOGGER_LEVELS, LOGGER_COLORS } from "@src/constants/logger.constant";

winston.addColors(LOGGER_COLORS);

class LoggerUtils {
  private static createFileTransport(filePath: string): winston.transport {
    try {
      return new winston.transports.DailyRotateFile({
        filename: `logs/%DATE%/${filePath}`,
        datePattern: "YYYY-MM-DD",
        maxSize: "200m",
        format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
          winston.format.errors({ stack: true }),
          winston.format.printf(
            (info) =>
              `${info.timestamp}: ${info.level} - ${info.message} ${
                info.stack ? " - " + info.stack : ""
              }`
          )
        ),
      });
    } catch (error) {
      console.error(`Failed to create file transport for ${filePath}:`, error);
      return new winston.transports.File({
        filename: "/dev/null",
        silent: true,
      });
    }
  }

  static createLogger(logPath: string) {
    const logger = winston.createLogger({
      level: "debug",
      levels: LOGGER_LEVELS,
      format: winston.format.prettyPrint(),
      transports: [this.createFileTransport(logPath)],
    });

    return logger;
  }
}

export const uniswapXDuchOrderLogger = LoggerUtils.createLogger("uniswapx-duch-order.log");
export const uniswapXLimitOrderLogger = LoggerUtils.createLogger("uniswapx-limit-order.log");
