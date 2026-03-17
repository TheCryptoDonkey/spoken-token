# CLAUDE.md — spoken-token

TOTP but you say it out loud. Generic spoken verification tokens from a shared secret.

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

- `src/token.ts` — core derivation: `derive(secret, context, counter)` → token bytes
- `src/verify.ts` — verification with tolerance window
- `src/encoding.ts` — output encoding (words, PIN, hex)
- `src/wordlist.ts` — 2048-word en-v1 spoken-clarity wordlist
- `src/counter.ts` — time-based counter derivation (`getTimeCounter`)
- `src/crypto.ts` — pure JS SHA-256, HMAC-SHA256, hex/base64 utilities
- `src/index.ts` — barrel re-export
- `PROTOCOL.md` — full protocol specification (SPOKEN-DERIVE, SPOKEN-ENCODE)

## Conventions

- **British English** — colour, initialise, behaviour, licence
- **ESM-only** — `"type": "module"` in package.json
- **TDD** — write failing test first, then implement
- **Zero dependencies** — all crypto is pure JS, no external packages
- **Git:** commit messages use `type: description` format
- **Git:** Do NOT include `Co-Authored-By` lines in commits

## Release & Versioning

**Automated via semantic-release** — version bumps and npm publishing happen automatically when you push to `main`.

| Type | Example | Version Bump |
|------|---------|--------------|
| `fix:` | `fix: handle counter overflow` | Patch (1.0.x) |
| `feat:` | `feat: add encoding format` | Minor (1.x.0) |
| `BREAKING CHANGE:` | In commit body | Major (x.0.0) |
| `chore:`, `docs:`, `refactor:` | `docs: update README` | None |

Tests must pass before release. GitHub Actions uses OIDC trusted publishing.

## Relationship to canary-kit

`spoken-token` is the generic core extracted from `canary-kit`. It handles derivation, encoding, and verification. `canary-kit` extends it with duress signalling, liveness monitoring, group management, Nostr transport, and threat-profile presets.
