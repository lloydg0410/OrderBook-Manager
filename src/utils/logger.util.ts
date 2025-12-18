import winston from "winston";
import "winston-daily-rotate-file";
import { LOGGER_LEVELS, LOGGER_COLORS } from "@src/constants/logger.constant";

winston.addColors(LOGGER_COLORS);

/**
 * Utility class for constructing Winston logger instances with consistent configuration.
 * Encapsulates logic related to file transports and logger formatting.
 */
class LoggerUtils {
  /**
   * Creates a Winston file transport that rotates log files daily.
   *
   * The transport will:
   *  - Write logs under the `logs/%DATE%/` directory, where `%DATE%` is formatted as `YYYY-MM-DD`.
   *  - Limit each log file size to 200 MB, automatically creating new files when exceeded.
   *  - Include timestamps and error stack traces (if present) in log messages.
   *
   * In case of any failure during transport creation (for example, due to file system issues),
   * this method falls back to a silent `File` transport targeting `/dev/null`, so that the
   * application continues to run without throwing unhandled exceptions from the logger setup.
   *
   * @param filePath Relative filename (within the date-based log directory) used for the log file.
   *                 Example: `"uniswapx-duch-order.log"`.
   * @returns A configured Winston transport instance suitable for use in a logger.
   */
  private static createFileTransport(filePath: string): winston.transport {
    try {
      return new winston.transports.DailyRotateFile({
        // Log file path template; %DATE% is automatically replaced by the current date.
        filename: `logs/%DATE%/${filePath}`,
        // Date format for directory segmentation.
        datePattern: "YYYY-MM-DD",
        // Maximum size per log file before rotation occurs.
        maxSize: "200m",
        // Compose log message format, including timestamp and optional error stack.
        format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
          // Ensures that error objects are properly formatted with their stack trace.
          winston.format.errors({ stack: true }),
          // Final message formatter used by the transport.
          winston.format.printf(
            (info) =>
              `${info.timestamp}: ${info.level} - ${info.message} ${
                info.stack ? " - " + info.stack : ""
              }`
          )
        ),
      });
    } catch (error) {
      // In case of errors during transport initialization, log to stderr and
      // return a silent transport to avoid interrupting application flow.
      console.error(`Failed to create file transport for ${filePath}:`, error);
      return new winston.transports.File({
        filename: "/dev/null",
        silent: true,
      });
    }
  }

  /**
   * Creates and configures a Winston logger instance associated with a specific log file path.
   *
   * The logger:
   *  - Uses custom log levels from `LOGGER_LEVELS`.
   *  - Defaults to the "debug" level, meaning it will log all levels at and above debug.
   *  - Applies `prettyPrint` formatting for readability in log files.
   *  - Uses a daily rotating file transport as its output target.
   *
   * @param logPath Log file name (used by the rotating file transport).
   *                Example: `"uniswapx-duch-order.log"`.
   * @returns A Winston `Logger` configured with rotation and project-specific log levels.
   */
  static createLogger(logPath: string) {
    const logger = winston.createLogger({
      // Minimum log level to capture.
      level: "debug",
      // Custom log levels for the application (e.g., info, warn, error, etc.).
      levels: LOGGER_LEVELS,
      // Human-readable JSON-like formatting of log entries.
      format: winston.format.prettyPrint(),
      // Output transports; currently only a rotating file transport is used.
      transports: [this.createFileTransport(logPath)],
    });

    return logger;
  }
}

/**
 * Logger dedicated to UniswapX Duch order related events.
 * Use this logger for recording Duch auction workflows, requests, and errors.
 */
export const uniswapXDuchOrderLogger = LoggerUtils.createLogger("uniswapx-duch-order.log");

/**
 * Logger dedicated to UniswapX Limit order related events.
 * Use this logger for recording limit order creation, updates, and execution details.
 */
export const uniswapXLimitOrderLogger = LoggerUtils.createLogger("uniswapx-limit-order.log");

/**
 * Logger dedicated to Velora order related events.
 * Use this logger for recording limit order creation, updates, and execution details.
 */
export const veloraOrderLogger = LoggerUtils.createLogger("velora-order.log");

/**
 * Logger dedicated to OneInch Fusion order related events.
 * Use this logger for recording fusion order creation, updates, and execution details.
 */
export const oneInchFusionOrderLogger = LoggerUtils.createLogger("one-inch-fusion-order.log");

/**
 * Logger dedicated to OneInch Limit order related events.
 * Use this logger for recording limit order creation, updates, and execution details.
 */
export const oneInchLimitOrderLogger = LoggerUtils.createLogger("one-inch-limit-order.log");
