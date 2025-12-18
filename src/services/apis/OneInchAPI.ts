import { ActiveOrder } from "@1inch/fusion-sdk/dist/types/src/api";
import { LimitOrderApiItem } from "@1inch/limit-order-sdk";
import { Environment } from "@src/constants/environment";
import axios from "axios";

export class OneInchAPI {
  /**
   * Axios client for the 1inch Fusion API.
   *
   * Configuration:
   *  - `baseURL` sourced from `Environment.ONE_INCH.FUSION_BASE_URL`.
   *  - `Authorization` header populated with the configured 1inch API key.
   *  - `Content-Type` set to `application/json` for JSON-based requests.
   *
   * This client is intended for endpoints related to Fusion orders and execution.
   */
  private static fusionApiClient = axios.create({
    baseURL: Environment.ONE_INCH.FUSION_BASE_URL,
    headers: {
      Authorization: `Bearer ${Environment.ONE_INCH.API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  /**
   * Axios client for the 1inch Order Book API.
   *
   * Configuration:
   *  - `baseURL` sourced from `Environment.ONE_INCH.ORER_BOOK_BASE_URL`.
   *  - `Authorization` header populated with the configured 1inch API key.
   *  - `Content-Type` set to `application/json`.
   *
   * This client is used for querying limit orders and their statuses.
   */
  private static orderBookApiClient = axios.create({
    baseURL: Environment.ONE_INCH.ORER_BOOK_BASE_URL,
    headers: {
      Authorization: `Bearer ${Environment.ONE_INCH.API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  /**
   * Retrieves active Fusion orders from the 1inch Fusion API.
   *
   * Endpoint:
   *  - GET `/orders/v2.0/1/order/active`
   *
   * Request parameters:
   *  - `limit: 500` – maximum number of active orders to retrieve in a single call.
   *
   * Behavior:
   *  - On success, returns the `items` array from the response payload as `ActiveOrder[]`.
   *  - On failure (network issues, non-2xx responses, or unexpected data shape):
   *      - Logs the error to stderr.
   *      - Returns an empty array, allowing callers to avoid mandatory try/catch where
   *        an empty result set can be treated as a safe failure mode.
   *
   * @returns Promise resolving to an array of active Fusion orders.
   */
  static async getFusionActiveOrders(): Promise<ActiveOrder[]> {
    try {
      const result = await this.fusionApiClient.get(
        "/orders/v2.0/1/order/active",
        { params: { limit: 500 } }
      );

      return result.data.items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Retrieves all limit orders from the 1inch Order Book API matching specific statuses.
   *
   * Endpoint:
   *  - GET `/v4.1/1/all`
   *
   * Request parameters:
   *  - `limit: 500` – maximum number of limit orders to retrieve.
   *  - `statuses: "1,2"` – comma-separated list of order status codes to filter by
   *      (the meaning of codes is defined by the 1inch Order Book specification).
   *
   * Behavior:
   *  - On success, returns the `items` array from the response payload as `LimitOrderApiItem[]`.
   *  - On failure:
   *      - Logs the error to stderr.
   *      - Returns an empty array so that callers can treat the absence of results
   *        as a non-fatal condition.
   *
   * @returns Promise resolving to an array of limit orders matching the specified criteria.
   */
  static async getAllLimitOrders(): Promise<LimitOrderApiItem[]> {
    try {
      const result = await this.orderBookApiClient.get("/v4.1/1/all", {
        params: { limit: 500, statuses: "1,2" },
      });

      return result.data.items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
