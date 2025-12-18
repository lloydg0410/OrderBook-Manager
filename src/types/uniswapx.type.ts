interface UniswapXOrderInput {
  token: string;
  startAmount: string;
  endAmount: string;
}

interface UniswapXOrderOutput {
  token: string;
  startAmount: string;
  endAmount: string;
  recipient: string;
}

interface UniswapXOrder {
  type: string;
  encodedOrder: string;
  signature: string;
  nonce: string;
  orderHash: string;
  orderStatus: string;
  chainId: number;
  swapper: string;
  deadline: number;
  createdAt: number;
  input: UniswapXOrderInput;
  outputs: UniswapXOrderOutput[];
}