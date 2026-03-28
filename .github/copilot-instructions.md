# spoken-token — Copilot Instructions

spoken-token is a zero-dependency TypeScript library that derives time-rotating, human-speakable verification tokens from a shared secret. Like TOTP, but optimised for the human voice.

## Key Facts

- ESM-only, works in Node.js and browsers
- Zero runtime dependencies — all crypto is pure JS (SHA-256, HMAC-SHA256)
- Package has 4 subpath exports: `./counter`, `./wordlist`, `./encoding`, `./crypto`
- Protocol spec: `PROTOCOL.md`

## Commands

- Build: `npm run build`
- Test: `npm test`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`

## Conventions

- British English (colour, initialise, behaviour)
- TDD — write failing test first, then implement
- Tests co-located with source: `src/token.ts` + `src/token.test.ts`
- Commit messages: `type: description` (fix:, feat:, docs:, refactor:, test:)

## Architecture

| File | Purpose |
|------|---------|
| `src/token.ts` | Core HMAC-SHA256 token derivation |
| `src/verify.ts` | Verification with tolerance window and timing-safe comparison |
| `src/encoding.ts` | Word, PIN, and hex encoding with bias control |
| `src/wordlist.ts` | 2048-word spoken-clarity English wordlist |
| `src/counter.ts` | Time-based and event-ID counter derivation |
| `src/crypto.ts` | Pure JS SHA-256, HMAC-SHA256, and byte utilities |

## Things to Avoid

- Do not replace the PIN_BYTES lookup table with a formula
- Do not remove the `"pair\0"` prefix from directional pairs
- Do not allow whitespace-only context strings, namespaces, or roles
- Do not add runtime dependencies
