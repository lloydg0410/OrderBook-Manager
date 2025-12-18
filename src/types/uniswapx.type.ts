/**
 * Represents the input leg of a UniswapX order.
 *
 * Fields:
 * - token       - ERC‑20 token address being provided by the swapper (input asset).
 * - startAmount - Initial (starting) amount of the input token as a decimal string.
 * - endAmount   - Final (ending) amount of the input token as a decimal string,
 *                 used in cases such as Dutch auctions where the amount may vary
 *                 over time or conditions.
 */
interface UniswapXOrderInput {
  token: string;
  startAmount: string;
  endAmount: string;
}

/**
 * Represents an output leg of a UniswapX order.
 *
 * Fields:
 * - token       - ERC‑20 token address the swapper expects to receive (output asset).
 * - startAmount - Initial (starting) amount of the output token as a decimal string.
 * - endAmount   - Final (ending) amount of the output token as a decimal string,
 *                 allowing for dynamic pricing or auction behavior.
 * - recipient   - Address that will receive this leg’s output tokens when the order
 *                 is executed (can differ per output leg).
 */
interface UniswapXOrderOutput {
  token: string;
  startAmount: string;
  endAmount: string;
  recipient: string;
}

/**
 * Canonical UniswapX order interface used throughout the application.
 *
 * High-level description:
 * - Encapsulates the encoded payload and signature required to execute an order
 *   on-chain.
 * - Exposes metadata such as order hash, status, and timestamps.
 * - Breaks down the order into a single `input` leg and one or more `outputs`,
 *   supporting multi-recipient / multi-asset use cases.
 *
 * Fields:
 * - type        - Order type identifier (e.g., "limit", "dutch", or protocol‑specific type).
 * - encodedOrder- ABI-encoded order data as a hex string (for direct contract calls).
 * - signature   - Signature over the encoded order, authorizing its execution.
 * - nonce       - Order nonce used for replay protection and order uniqueness.
 * - orderHash   - Unique hash identifying this order (derivable from order data).
 * - orderStatus - Current status string (e.g., "open", "filled", "cancelled").
 * - chainId     - EVM chain ID on which this order is valid (e.g., 1 for Ethereum mainnet).
 * - swapper     - Address of the user or contract that created the order.
 * - deadline    - UNIX timestamp (seconds) after which the order is no longer valid.
 * - createdAt   - UNIX timestamp (seconds) when the order was created (off-chain metadata).
 * - input       - Input leg describing the asset and amount supplied by the swapper.
 * - outputs     - Array of output legs describing the asset(s), amount(s), and recipients.
 */
export interface UniswapXOrder {
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