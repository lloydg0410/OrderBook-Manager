export interface VeloraOrder {
  expiry: number;
  createdAt: number;
  updatedAt: number;
  transactionHash: string;
  chainId: number;
  nonceAndMeta: string;
  maker: string;
  taker: string;
  takerFromMeta: string;
  makerAsset: string;
  takerAsset: string;
  makerAmount: string;
  fillableBalance: string;
  swappableBalance: string;
  makerBalance: string;
  isFillOrKill: boolean;
  takerAmount: string;
  orderHash: string;
  permitMakerAsset: string;
  type: string;
  state: string;
}
