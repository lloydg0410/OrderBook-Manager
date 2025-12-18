export const LOGGER_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

/**
 * Color mappings for each log level, typically used for colorizing
 * console output to improve readability.
 *
 * Common usage:
 * - error: Red   — highlights critical failures.
 * - warn:  Yellow— flags warnings or suspicious behavior.
 * - info:  Green — indicates successful or normal operations.
 * - debug: Blue  — denotes verbose, debug-level diagnostics.
 */
export const LOGGER_COLORS = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
};
