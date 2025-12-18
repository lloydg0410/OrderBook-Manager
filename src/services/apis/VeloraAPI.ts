import axios from "axios";
import { VeloraOrder } from "@src/types/velora.type";

export class VeloraAPI {
  private static apiClient = axios.create({
    baseURL: "https://api.paraswap.io",
  });

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
      return result.data.orders;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
