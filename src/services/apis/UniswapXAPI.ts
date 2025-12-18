import axios from "axios";
import { UniswapXOrder } from "@src/types/uniswapx.type";

export class UniswapXAPI {
  /**
   * Shared axios instance configured with the Uniswap API v2 base URL.
   * All UniswapX API calls are routed through this client to centralize
   * configuration and middleware if needed (e.g., timeouts, interceptors).
   */
  private static apiClient = axios.create({ baseURL: "https://api.uniswap.org/v2" });

  /**
   * Fetches a list of open UniswapX orders from the Uniswap API.
   *
   * Behavior:
   * - Chooses the endpoint based on `isLimitOrder`:
   *   - `true`  → `/limit-orders`
   *   - `false` → `/orders` (typically Dutch / auction-style orders)
   * - Sends a GET request with standardized query parameters:
   *   - `limit: 100`          → maximum number of orders to retrieve.
   *   - `orderStatus: "open"` → only orders that are currently open.
   *   - `sortKey: "createdAt"`
   *   - `desc: true`          → newest orders first.
   *   - `chainId: 1`          → Ethereum mainnet.
   *
   * Error handling:
   * - Any network/API error is caught.
   * - The error is logged to stderr via `console.error`.
   * - An empty array is returned to keep callers resilient.
   *
   * @param isLimitOrder - If `true`, fetches open limit orders; if `false`,
   *                       fetches other UniswapX order types (e.g., Dutch orders).
   *
   * @returns A Promise resolving to an array of `UniswapXOrder` objects representing
   *          the fetched open orders. Returns an empty array on failure.
   */
  static async getUniswapXOrders(isLimitOrder: boolean): Promise<UniswapXOrder[]> {
    try {
      const result = await this.apiClient.get(
        isLimitOrder ? "/limit-orders" : "/orders",
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 100,
            orderStatus: "open",
            sortKey: "createdAt",
            desc: true,
            chainId: 1,
          },
        }
      );

      return result.data.orders;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}