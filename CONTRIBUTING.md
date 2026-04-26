# Contributing to lite-embeds

Thanks for taking the time to contribute. This document covers the local setup, repo layout, and the conventions we follow.

## Code of conduct

Be respectful. Assume good intent. We follow the [Contributor Covenant](https://www.contributor-covenant.org/) in spirit; report unacceptable behavior to the maintainers via the email on the GitHub profile.

## Getting started

Requirements:

- Node.js `>=20`
- [pnpm](https://pnpm.io) `9` (managed via Corepack)

```bash
corepack enable
pnpm install
pnpm build
pnpm test
```

Open `examples/vanilla/index.html` in a browser to try the components locally.

## Repo layout

This is a pnpm workspace monorepo:

```
packages/
  core/        Shared base class and helpers
  twitter/     <lite-twitter>
  instagram/   <lite-instagram>
  tiktok/      <lite-tiktok>
  spotify/     <lite-spotify>
  vimeo/       <lite-vimeo>
```

Each package ships independently to npm under the `@lite-embeds/` scope.

## Development workflow

- `pnpm lint` — Biome check (formatting + linting)
- `pnpm format` — Biome auto-format
- `pnpm typecheck` — TypeScript across all packages
- `pnpm test` — Vitest (happy-dom)
- `pnpm build` — tsup builds all packages

CI runs lint, build, and test on every PR. All must pass before merge.

## Design principles

Read these before proposing changes — they explain why we say no to things:

1. **Facade-first.** Render a static placeholder synchronously. The real iframe/script loads only after the user clicks.
2. **Zero runtime dependencies.** Every package must keep `dependencies: {}`. If you need a utility, inline it or put it in `@lite-embeds/core`.
3. **Tiny budgets.** Each package targets <3 KB gzipped. PRs that grow bundle size need to justify the cost.
4. **No tracking before consent.** No third-party requests fire until user interaction. This is the whole product.
5. **Web Components, not framework wrappers.** The output is a custom element usable from anywhere.

## Adding a new platform

1. Copy `packages/twitter` as a template.
2. Update `package.json` (name, description, keywords).
3. Implement the facade in `src/index.ts` extending the core base class.
4. Add tests in `test/`.
5. Add a README with quick-start, attributes, and a bundle-size badge.
6. Add the package to the table in the root `README.md`.
7. Open a PR — see below.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(twitter): add reply count attribute
fix(spotify): preserve :host styles on hydrate
docs: update bundle size badges
chore: bump dependencies
ci: pin node version
```

Scopes are package names (`twitter`, `spotify`, etc.), or `core`, `ci`, `docs`. Multi-package changes can use `fix(twitter,spotify):`.

## Pull requests

1. Fork and create a branch off `main`.
2. Make your changes. Keep diffs focused — one concern per PR.
3. Run `pnpm lint && pnpm typecheck && pnpm test` locally.
4. Open the PR. Reference the issue it closes (`Closes #123`).
5. Be ready to iterate on review feedback.

PRs that touch bundle size should include before/after numbers.

## Reporting bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml). Include:

- Affected package(s) and version
- A minimal reproduction (StackBlitz/CodeSandbox link is gold)
- Browser + OS
- Expected vs. actual behavior

## Proposing features

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml). For new platforms, please open an issue first to discuss before implementing — it saves wasted work.

## License

By contributing, you agree your contributions are licensed under the MIT License.
