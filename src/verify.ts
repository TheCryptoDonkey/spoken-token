import { deriveToken } from './token.js'
import { timingSafeStringEqual } from './crypto.js'
import { type TokenEncoding, DEFAULT_ENCODING } from './encoding.js'

/** Maximum allowed tolerance value. */
export const MAX_TOLERANCE = 10

/** Maximum identities to bound computational cost. */
const MAX_IDENTITIES = 100

/** Result of verifying a token. */
export interface VerifyResult {
  /** 'valid' = matches a derived token, 'invalid' = no match. */
  status: 'valid' | 'invalid'
  /** The identity whose token matched (when identities are provided). */
  identity?: string
}

/** Options for token verification. */
export interface VerifyOptions {
  /** Output encoding to use for comparison (default: single word). */
  encoding?: TokenEncoding
  /** Counter tolerance window: accept tokens within ±tolerance (default: 0). */
  tolerance?: number
}

/**
 * Verify a spoken/entered token against a shared secret.
 *
 * Checks in order:
 * 1. Per-identity tokens at exact counter
 * 2. Per-identity tokens across tolerance window
 * 3. Group-wide token (no identity) across tolerance window
 * 4. No match → invalid
 *
 * @param secret - Shared secret (hex string or Uint8Array).
 * @param context - Context string for domain separation.
 * @param counter - Current time-based counter.
 * @param input - The spoken/entered token to verify.
 * @param identities - Optional array of member identities (max 100).
 * @param options - Optional encoding and tolerance settings.
 */
export function verifyToken(
  secret: Uint8Array | string,
  context: string,
  counter: number,
  input: string,
  identities?: string[],
  options?: VerifyOptions,
): VerifyResult {
  const encoding = options?.encoding ?? DEFAULT_ENCODING
  const tolerance = options?.tolerance ?? 0
  if (!Number.isInteger(tolerance) || tolerance < 0) {
    throw new RangeError('Tolerance must be a non-negative integer')
  }
  if (tolerance > MAX_TOLERANCE) {
    throw new RangeError(`Tolerance must be <= ${MAX_TOLERANCE}, got ${tolerance}`)
  }
  if (identities && identities.length > MAX_IDENTITIES) {
    throw new RangeError(`identities array must not exceed ${MAX_IDENTITIES} entries`)
  }
  const normalised = input.toLowerCase().trim().replace(/\s+/g, ' ')
  const lo = Math.max(0, counter - tolerance)
  const hi = Math.min(0xFFFFFFFF, counter + tolerance)

  // 1. Check per-identity tokens at exact counter
  if (identities && identities.length > 0) {
    for (const identity of identities) {
      if (timingSafeStringEqual(normalised, deriveToken(secret, context, counter, encoding, identity))) {
        return { status: 'valid', identity }
      }
    }
    // 2. Check per-identity tokens across tolerance window (non-exact)
    for (const identity of identities) {
      for (let c = lo; c <= hi; c++) {
        if (c === counter) continue
        if (timingSafeStringEqual(normalised, deriveToken(secret, context, c, encoding, identity))) {
          return { status: 'valid', identity }
        }
      }
    }
  }

  // 3. Check group-wide token (no identity)
  for (let c = lo; c <= hi; c++) {
    if (timingSafeStringEqual(normalised, deriveToken(secret, context, c, encoding))) {
      return { status: 'valid' }
    }
  }

  return { status: 'invalid' }
}
