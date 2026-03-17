# AGENTS.md — spoken-token

Instructions for AI coding agents working on this project.

## What this project does

TOTP but you say it out loud. Derive time-rotating, human-speakable verification tokens from a shared secret. Zero runtime dependencies, ESM-only, works in Node.js and the browser.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm test` | Run all tests (vitest) |
| `npm run test:watch` | Watch mode |
| `npm run typecheck` | Type-check without emitting |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | ESLint with auto-fix |

## Structure

| File | Purpose |
|------|---------|
| `src/token.ts` | Core derivation: `deriveToken`, `deriveDirectionalPair` |
| `src/verify.ts` | Verification with tolerance window |
| `src/encoding.ts` | Output encoding (words, PIN, hex) |
| `src/wordlist.ts` | 2048-word en-v1 spoken-clarity wordlist |
| `src/counter.ts` | Time-based and event-ID counter derivation |
| `src/crypto.ts` | Pure JS SHA-256, HMAC-SHA256, hex/base64 utilities |
| `src/index.ts` | Barrel re-export |

## Conventions

- **British English** — colour, initialise, behaviour
- **ESM-only** — `import`/`export`, no CommonJS
- **Zero runtime dependencies** — all crypto is pure JS, no external packages
- **TDD** — write a failing test first, then implement
- Tests are co-located: `token.ts` + `token.test.ts`
- Commit messages use `type: description` format (`fix:`, `feat:`, `docs:`, `refactor:`, `test:`)

## Verifying changes

Always run before submitting:

```bash
npm test && npm run typecheck && npm run lint
```

## Release process

Automated via semantic-release on push to `main`. Use conventional commit types to control version bumps (`fix:` = patch, `feat:` = minor, `BREAKING CHANGE:` in body = major).

## Related projects

- **canary-kit** extends spoken-token with duress signalling, liveness monitoring, group management, and Nostr transport.
