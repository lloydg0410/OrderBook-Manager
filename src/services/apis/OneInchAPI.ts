import { ActiveOrder } from "@1inch/fusion-sdk/dist/types/src/api";
import { LimitOrderApiItem } from "@1inch/limit-order-sdk";
import { Environment } from "@src/constants/environment";
import axios from "axios";

export class OneInchAPI {
  private static fusionApiClient = axios.create({
    baseURL: Environment.ONE_INCH.FUSION_BASE_URL,
    headers: {
      Authorization: `Bearer ${Environment.ONE_INCH.API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  private static orderBookApiClient = axios.create({
    baseURL: Environment.ONE_INCH.ORER_BOOK_BASE_URL,
    headers: {
      Authorization: `Bearer ${Environment.ONE_INCH.API_KEY}`,
      "Content-Type": "application/json",
    },
  });

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
