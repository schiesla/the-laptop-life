# Content Seeding Pipeline

How to write a new post/product, proof it, approve it, and get it live in any environment (local sandbox, `develop`, `main`).

## Overview

Content moves through three files before it's data in a database:

| File | Purpose |
|---|---|
| `src/data/drafts.ts` | Staging area. Unapproved, in-progress content. Cleared out as items are approved. |
| `src/data/published.ts` | Permanent record of every approved post/product. **Append-only** — never delete from here. This is the single source `scripts/seed.mjs` reads from, for every environment. |
| `src/data/contentTypes.ts` | Shared `ContentPost` / `ContentProduct` TypeScript interfaces used by both files above. |

Each environment (sandbox, `develop`, `main`) has its own completely separate backend — its own DynamoDB tables, AppSync API, and Cognito user pool. Seeding one does not affect the others.

## Step-by-step

### 1. Write the content
Add the new entry to `draftPosts` or `draftProducts` in `src/data/drafts.ts`.

### 2. Proofread it
```bash
npm run dev
```
Visit `http://localhost:5173/preview` — lists all current drafts. Click into one for `/preview/:slug`, which renders through the real `BlogPost` component and CSS, so what you see is pixel-identical to what will ship. (These routes are dev-only, gated by `import.meta.env.DEV`, and are stripped out of production builds automatically.)

### 3. Approve it
Move (cut and paste, don't just delete) the entry from `drafts.ts` into `published.ts`'s `publishedPosts` / `publishedProducts` arrays. Never remove an entry from `published.ts` once it's there — it needs to stay available so any environment can be seeded or re-seeded from it later.

### 4. Make sure your AWS session is valid
```bash
aws sso login --sso-session amplify-admin
```
Use the session-based form, not a plain profile login — the AWS CLI and the Node-based Amplify SDK (`ampx`) can disagree on token validity even when pointed at the same SSO config, and this is the reliable fix.

### 5. Point at the right backend

**Sandbox** (your local personal environment) — no setup needed, the repo-root `amplify_outputs.json` already targets it.

**`develop` or `main`** — regenerate that branch's config file:
```bash
npx ampx generate outputs --app-id dho8s3nisnd54 --branch develop --out-dir .amplify-dev
```
Swap `develop` for `main` as needed. `.amplify-dev` is just a folder name — pick anything, it's gitignored.

### 6. Confirm the target schema actually has the fields your content uses
Schema changes (e.g. adding a new field to a model in `amplify/data/resource.ts`) deploy **per-environment** — sandbox via `ampx sandbox`, `develop`/`main` via the CI pipeline on push. A field can be live in one environment and missing in another. Check before seeding:
```bash
python3 -c "import json; print(list(json.load(open('.amplify-dev/amplify_outputs.json'))['data']['model_introspection']['models']['Post']['fields'].keys()))"
```
If a field your content uses isn't listed, the seed mutation will fail — push the schema change to that branch (or wait for CI to finish) first.

### 7. Make sure a confirmed seed user exists in that backend's Cognito pool
Each environment has a completely separate user pool. `scripts/.env.local`'s `SEED_EMAIL` / `SEED_PASSWORD` only works against a pool where that exact user has been signed up **and confirmed**. If seeding a brand-new environment for the first time, that user needs to be created there via self-service `signUp` + `confirmSignUp` (admin CLI user creation is blocked by the AWS role's permissions).

### 8. Clear, then seed
There's no dedupe logic — re-running the seed script without clearing first creates duplicate records (Posts/Products key on an auto-generated `id`, not on `slug`/`name`).

```bash
# Sandbox
node scripts/clear.mjs
node --experimental-strip-types scripts/seed.mjs

# develop / main
OUTPUTS_PATH=.amplify-dev/amplify_outputs.json node scripts/clear.mjs
OUTPUTS_PATH=.amplify-dev/amplify_outputs.json node --experimental-strip-types scripts/seed.mjs
```
The `--experimental-strip-types` flag is required because `published.ts`/`drafts.ts` are TypeScript files and `seed.mjs` imports them directly.

### 9. Verify on the actual live site
Don't just trust the script's `✓` output — open the real URL and check it rendered:
- Sandbox: `http://localhost:5173/blog/<slug>` (via `npm run dev`)
- `develop`: `https://develop.dho8s3nisnd54.amplifyapp.com/blog/<slug>`
- `main`: `https://www.the-laptop-life.com/blog/<slug>`

## Quick reference

| Task | Command |
|---|---|
| Refresh AWS session | `aws sso login --sso-session amplify-admin` |
| Get a branch's backend config | `npx ampx generate outputs --app-id dho8s3nisnd54 --branch <branch> --out-dir .amplify-dev` |
| Check a backend's live schema fields | `python3 -c "import json; print(list(json.load(open('<outputs-path>'))['data']['model_introspection']['models']['Post']['fields'].keys()))"` |
| Wipe an environment's Post/Product data | `[OUTPUTS_PATH=...] node scripts/clear.mjs` |
| Seed an environment from `published.ts` | `[OUTPUTS_PATH=...] node --experimental-strip-types scripts/seed.mjs` |
