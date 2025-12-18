import axios from "axios";
import { VeloraOrder } from "@src/types/velora.type";

export class VeloraAPI {
  /**
   * Preconfigured Axios instance for communicating with the ParaSwap API.
   *
   * Configuration:
   *  - `baseURL` is set to `https://api.paraswap.io`, so all relative paths
   *    issued by this client will target the ParaSwap public API.
   */
  private static apiClient = axios.create({
    baseURL: "https://api.paraswap.io",
  });

  /**
   * Retrieves a list of Velora orders from the ParaSwap API.
   *
   * Endpoint:
   *  - GET `/ft/orders/1/taker/0x0000000000000000000000000000000000000000`
   *
   * Request details:
   *  - Sends `Content-Type: application/json` header.
   *  - Uses `limit=500` as a query parameter to constrain the maximum number of
   *    orders returned by the API.
   *
   * Behavior:
   *  - On success, extracts and returns the `orders` field from the response payload
   *    as a `VeloraOrder[]`.
   *  - On failure (network errors, non-2xx responses, or unexpected payload structure),
   *    logs the error to stderr and returns an empty array, allowing callers to avoid
   *    try/catch logic if an empty result set is acceptable as a failure mode.
   *
   * @returns Promise resolving to an array of `VeloraOrder` instances.
   */
  static async getVeloraOrders(): Promise<VeloraOrder[]> {
    try {
      const result = await this.apiClient.get(
        "/ft/orders/1/taker/0x0000000000000000000000000000000000000000",
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 500,
          },
        }
      );

      // Extract and return the list of orders from the API response.
      return result.data.orders;
    } catch (error) {
      // Log failure and degrade gracefully by returning an empty list.
      console.error(error);
      return [];
    }
  }
}
