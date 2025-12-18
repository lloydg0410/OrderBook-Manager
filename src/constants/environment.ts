import { config } from "dotenv";

config();

export const Environment = {
  ONE_INCH: {
    FUSION_BASE_URL: "https://api.1inch.com/fusion",
    ORER_BOOK_BASE_URL: "https://api.1inch.com/orderbook",
    API_KEY: process.env.ONE_INCH_API_KEY ?? ""
  }
};
