import axios from "axios";

export class UniswapXAPI {
  private static apiClient = axios.create({baseURL: "https://api.uniswap.org/v2"});

  static async getUniswapXOrders(isLimitOrder: boolean): Promise<UniswapXOrder[]> {
    try {
      const result = await this.apiClient.get(isLimitOrder ? "/limit-orders" : "/orders", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          limit: 100,
          orderStatus: "open",
          sortKey: "createdAt",
          desc: true,
          chainId: 1
        }
      });

      return result.data.orders;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}