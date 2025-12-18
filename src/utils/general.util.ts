export class GeneralUtils {
  /**
   * Asynchronously pauses execution for the specified number of milliseconds.
   *
   * Behavior:
   * - If `milliseconds` is less than or equal to 0, the function returns immediately.
   * - Otherwise, it returns a Promise that resolves after the timeout expires.
   *
   * Typical usage:
   * - Throttling API calls.
   * - Adding delays between retries.
   * - Rate-limiting block or transaction processing loops.
   *
   * @param milliseconds - Duration to sleep for, in milliseconds.
   *
   * @returns A Promise that resolves after the given delay. The resolved value
   *          is `1`, though callers usually ignore this and simply `await` it.
   */
  static async sleep(milliseconds: number) {
    if (milliseconds <= 0) return;

    return new Promise((res) => {
      setTimeout(() => {
        res(1);
      }, milliseconds);
    });
  }
}