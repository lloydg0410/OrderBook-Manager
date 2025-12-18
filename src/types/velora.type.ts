/**
 * Describes a single Velora order entity fetched from ParaSwap.
 *
 * All numeric-like fields that originate from on-chain values or API payloads
 * are represented as `number` or `string` depending on their expected range and
 * serialization format:
 *  - Timestamps and chain identifiers are stored as `number`.
 *  - Amounts and balances are stored as `string` to safely handle large integer
 *    values that may exceed JavaScript's safe integer range.
 */
export interface VeloraOrder {
  /**
   * UNIX timestamp (in seconds or milliseconds depending on API contract) at which
   * this order becomes invalid and can no longer be filled.
   */
  expiry: number;

  /**
   * UNIX timestamp representing when the order was initially created.
   */
  createdAt: number;

  /**
   * UNIX timestamp representing the last time the order was updated.
   */
  updatedAt: number;

  /**
   * Transaction hash associated with this order, if applicable. This may refer to
   * the on-chain transaction used to create, update, or otherwise register the order.
   */
  transactionHash: string;

  /**
   * EVM chain identifier (e.g., 1 for Ethereum mainnet, 137 for Polygon).
   */
  chainId: number;

  /**
   * Encoded value containing the order nonce and additional metadata as defined
   * by the Velora / ParaSwap protocol.
   */
  nonceAndMeta: string;

  /**
   * Address of the order maker (the party providing liquidity or initiating the order).
   */
  maker: string;

  /**
   * Address of the order taker if specified (the party allowed / intended to fill the order).
   * May be a zero address if the order is open to any taker.
   */
  taker: string;

  /**
   * Taker address as derived from metadata or additional context, if different from
   * the primary `taker` field.
   */
  takerFromMeta: string;

  /**
   * Contract address of the asset being offered by the maker (asset sent by maker).
   */
  makerAsset: string;

  /**
   * Contract address of the asset the maker expects in return (asset received by maker).
   */
  takerAsset: string;

  /**
   * Total amount of the maker asset that is being offered in the order.
   * Represented as a string to preserve full precision (typically in base units).
   */
  makerAmount: string;

  /**
   * Amount of the maker asset that is still fillable on this order. This takes into
   * account partial fills and any reductions over time.
   */
  fillableBalance: string;

  /**
   * Amount of the maker asset that is currently swappable given the maker's constraints
   * and on-chain balances.
   */
  swappableBalance: string;

  /**
   * Current on-chain balance of the maker for the specified maker asset.
   */
  makerBalance: string;

  /**
   * Indicates whether the order must be filled completely in a single transaction.
   * If `true`, partial fills are not allowed (fill-or-kill semantics).
   */
  isFillOrKill: boolean;

  /**
   * Total amount of the taker asset that the taker will provide if the order is
   * fully filled. Represented as a string for precision reasons.
   */
  takerAmount: string;

  /**
   * Unique hash of the order, typically computed from its parameters and used as
   * an immutable identifier on- and off-chain.
   */
  orderHash: string;

  /**
   * Encoded permit or authorization related to the maker asset (e.g., EIP-2612 permit),
   * allowing token transfers without prior on-chain approval.
   */
  permitMakerAsset: string;

  /**
   * String representing the type or classification of the order. The exact value
   * is defined by the Velora / ParaSwap API (e.g., limit order, RFQ, etc.).
   */
  type: string;

  /**
   * Current state of the order (e.g., "OPEN", "FILLED", "CANCELLED", "EXPIRED").
   * Concrete values depend on the ParaSwap Velora API specification.
   */
  state: string;
}
