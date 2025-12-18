import { OneInchAPI } from "./services/apis/OneInchAPI";
import { UniswapXAPI } from "./services/apis/UniswapXAPI";
import { VeloraAPI } from "./services/apis/VeloraAPI";
import { GeneralUtils } from "./utils/general.util";
import {
  oneInchFusionOrderLogger,
  oneInchLimitOrderLogger,
  uniswapXDuchOrderLogger,
  uniswapXLimitOrderLogger,
  veloraOrderLogger,
} from "./utils/logger.util";

/**
 * Fetches UniswapX Duch orders from the external API and logs the result.
 *
 * Behavior:
 *  - Calls `UniswapXAPI.getUniswapXOrders(false)` to retrieve Duch orders.
 *  - Logs the full JSON response to the `uniswapXDuchOrderLogger`.
 *  - Outputs a summary line to stdout including the number of orders fetched
 *    and the elapsed time of the operation.
 *
 * Note:
 *  - This function does not implement explicit error handling; any errors thrown by
 *    the API call will propagate to the caller.
 */
const fetchUniswapXDuchOrders = async () => {
  const startTime = Date.now();

  // Retrieve Duch orders (false indicates non-limit / Duch orders).
  const orders = await UniswapXAPI.getUniswapXOrders(false);

  // Persist the full order payload for auditing/analysis.
  uniswapXDuchOrderLogger.info(`${JSON.stringify(orders, null, 2)}\n\n`);

  // Console-level summary for quick runtime inspection.
  console.log(
    `Fetch ${orders.length} UniswapX Duch Orders, Took ${
      Date.now() - startTime
    }ms`
  );
};

/**
 * Fetches UniswapX Limit orders from the external API and logs the result.
 *
 * Behavior:
 *  - Calls `UniswapXAPI.getUniswapXOrders(true)` to retrieve Limit orders.
 *  - Logs the complete JSON response to the `uniswapXLimitOrderLogger`.
 *  - Outputs a brief performance summary (order count and latency) to stdout.
 *
 * Note:
 *  - Similar to `fetchUniswapXDuchOrders`, this function assumes the caller is
 *    responsible for handling any thrown errors.
 */
const fetchUniswapXLimitOrders = async () => {
  const startTime = Date.now();

  // Retrieve Limit orders (true indicates limit orders).
  const orders = await UniswapXAPI.getUniswapXOrders(true);

  // Persist the full order payload for later analysis/debugging.
  uniswapXLimitOrderLogger.info(`${JSON.stringify(orders, null, 2)}\n\n`);

  // Console-level summary for quick runtime inspection.
  console.log(
    `Fetch ${orders.length} UniswapX Limit Orders, Took ${
      Date.now() - startTime
    }ms`
  );
};

/**
 * Fetches Velora orders from the external API and logs the result.
 *
 * Behavior:
 *  - Calls `VeloraAPI.getVeloraOrders()` to retrieve orders.
 *  - Logs the complete JSON response to the `veloraOrderLogger`.
 *  - Outputs a brief performance summary (order count and latency) to stdout.
 */
const fetchVeloraOrders = async () => {
  const startTime = Date.now();

  // Retrieve Limit orders (true indicates limit orders).
  const orders = await VeloraAPI.getVeloraOrders();

  // Persist the full order payload for later analysis/debugging.
  veloraOrderLogger.info(`${JSON.stringify(orders, null, 2)}\n\n`);

  // Console-level summary for quick runtime inspection.
  console.log(
    `Fetch ${orders.length} Velora Orders, Took ${
      Date.now() - startTime
    }ms`
  );
};

/**
 * Fetches OneInch Fusion orders from the external API and logs the result.
 *
 * Behavior:
 *  - Calls `OneInchAPI.getFusionActiveOrders()` to retrieve orders.
 *  - Logs the complete JSON response to the `oneInchFusionOrderLogger`.
 *  - Outputs a brief performance summary (order count and latency) to stdout.
 */
const fetchOneInchFusionOrders = async () => {
  const startTime = Date.now();

  // Retrieve Limit orders (true indicates limit orders).
  const orders = await OneInchAPI.getFusionActiveOrders();

  // Persist the full order payload for later analysis/debugging.
  oneInchFusionOrderLogger.info(`${JSON.stringify(orders, null, 2)}\n\n`);

  // Console-level summary for quick runtime inspection.
  console.log(
    `Fetch ${orders.length} OneInch Fusion Orders, Took ${
      Date.now() - startTime
    }ms`
  );
};

/**
 * Fetches OneInch Fusion orders from the external API and logs the result.
 *
 * Behavior:
 *  - Calls `OneInchAPI.getAllLimitOrders()` to retrieve orders.
 *  - Logs the complete JSON response to the `oneInchLimitOrderLogger`.
 *  - Outputs a brief performance summary (order count and latency) to stdout.
 */
const fetchOneInchLimitOrders = async () => {
  const startTime = Date.now();

  // Retrieve Limit orders (true indicates limit orders).
  const orders = await OneInchAPI.getAllLimitOrders();

  // Persist the full order payload for later analysis/debugging.
  oneInchLimitOrderLogger.info(`${JSON.stringify(orders, null, 2)}\n\n`);

  // Console-level summary for quick runtime inspection.
  console.log(
    `Fetch ${orders.length} OneInch Limit Orders, Took ${
      Date.now() - startTime
    }ms`
  );
};

/**
 * Main polling loop.
 *
 * Behavior:
 *  - Runs an infinite loop that:
 *      1. Concurrently fetches Duch and Limit UniswapX orders using `Promise.allSettled`.
 *      2. Logs the total time for both fetch operations to complete.
 *      3. Sleeps for 1 second before repeating the cycle.
 *
 * Design considerations:
 *  - `Promise.allSettled` is used so that a failure in one fetch operation
 *    does not prevent the other from executing in subsequent iterations.
 *  - The polling interval is fixed at 1000 ms; adjust this in accordance with
 *    API rate limits and operational requirements.
 */
const main = async () => {
  while (true) {
    const startTime = Date.now();

    // Fetch Duch and Limit orders concurrently; do not short-circuit on failure.
    await Promise.allSettled([
      fetchUniswapXDuchOrders(),
      fetchUniswapXLimitOrders(),
      fetchVeloraOrders(),
      fetchOneInchFusionOrders(),
      fetchOneInchLimitOrders()
    ]);

    // Log total cycle duration for both operations.
    console.log(`Took ${Date.now() - startTime}ms.\n\n`);

    // Throttle request frequency to avoid overwhelming the upstream API.
    await GeneralUtils.sleep(5000);
  }
};

// Start the continuous polling process.
main();
