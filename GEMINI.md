# GEMINI.md — spoken-token

TOTP but you say it out loud. Derive time-rotating, human-speakable verification tokens from a shared secret.

## Commands

- `npm run build` — compile TypeScript to dist/
- `npm test` — run all tests (vitest)
- `npm run test:watch` — watch mode
- `npm run typecheck` — type-check without emitting
- `npm run lint` — run ESLint
- `npm run lint:fix` — run ESLint with auto-fix

## Dependencies

**Zero runtime dependencies.** Pure JS SHA-256, HMAC-SHA256, and encoding.

## Structure

- `src/token.ts` — core derivation: `deriveToken`, `deriveDirectionalPair`
- `src/verify.ts` — verification with tolerance window
- `src/encoding.ts` — output encoding (words, PIN, hex)
- `src/wordlist.ts` — 2048-word en-v1 spoken-clarity wordlist
- `src/counter.ts` — time-based and event-ID counter derivation
- `src/crypto.ts` — pure JS SHA-256, HMAC-SHA256, hex/base64 utilities
- `src/index.ts` — barrel re-export
- `PROTOCOL.md` — full protocol specification v2.0

## Subpath Exports

- `spoken-token` — full API
- `spoken-token/counter` — counter utilities
- `spoken-token/wordlist` — wordlist and lookup functions
- `spoken-token/encoding` — encoding functions
- `spoken-token/crypto` — cryptographic primitives

## Conventions

- **British English** — colour, initialise, behaviour, licence
- **ESM-only** — `import`/`export`, no CommonJS
- **Zero runtime dependencies** — all crypto is pure JS
- **TDD** — write failing test first, then implement
- Tests co-located: `token.ts` + `token.test.ts`
- Commit messages: `type: description` format

## Verifying Changes

```bash
npm test && npm run typecheck && npm run lint
```

## Key Pitfalls

- PIN_BYTES lookup table must not be replaced with a formula (bias control)
- `"pair\0"` prefix in directional pairs is required for domain separation
- Whitespace-only context/namespace/role strings are rejected
- Counter range: uint32 only (0 to 4,294,967,295)

## Related Projects

- **canary-kit** extends spoken-token with duress signalling, liveness, groups, and Nostr transport
