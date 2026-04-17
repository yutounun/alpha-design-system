# Changesets

This repo uses [Changesets](https://github.com/changesets/changesets) to version the **alpha-design-system** npm package.

## When you change components or anything that should ship on npm

1. Run `pnpm changeset`
2. Choose patch / minor / major
3. Commit the generated `.changeset/*.md` in your PR

After merging to `main`, GitHub Actions opens or updates a **Version Packages** PR. Merging that PR runs `npm publish` and creates a GitHub Release.

## Manual release triggers

- **GitHub**: Actions → **Release** → **Run workflow**
- **Local** (after versions are bumped): `pnpm release` (requires `NPM_TOKEN` / `npm login` as appropriate)
