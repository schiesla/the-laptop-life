/**
 * Seed script — loads draft posts and products into DynamoDB via AppSync.
 * Content lives in src/data/drafts.js — proofread it at /preview (dev server,
 * dev-only route) before running this, then remove entries from drafts.js
 * once confirmed live so re-running this script doesn't duplicate them.
 *
 * Usage:
 *   node scripts/seed.mjs                         # uses ../amplify_outputs.json (sandbox)
 *   OUTPUTS_PATH=.amplify-dev/amplify_outputs.json node scripts/seed.mjs   # e.g. develop branch
 *
 * Requires the target amplify_outputs.json to be present — for a deployed branch,
 * generate it first with:
 *   npx ampx generate outputs --app-id <appId> --branch <branch> --out-dir <dir>
 * Requires SEED_EMAIL and SEED_PASSWORD in scripts/.env.local (or the environment),
 * pointing at a confirmed Cognito user IN THAT BACKEND'S user pool — Post/Product only
 * allow `create` for allow.authenticated(), so an anonymous/guest identity gets
 * "Not Authorized", and each branch/sandbox has its own separate user pool.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { signIn, fetchAuthSession } from 'aws-amplify/auth';
import { draftPosts, draftProducts } from '../src/data/drafts.js';

config({ path: fileURLToPath(new URL('.env.local', import.meta.url)) });

const { SEED_EMAIL, SEED_PASSWORD, OUTPUTS_PATH } = process.env;
if (!SEED_EMAIL || !SEED_PASSWORD) {
  console.error('Missing SEED_EMAIL / SEED_PASSWORD. Add them to scripts/.env.local.');
  process.exit(1);
}

const outputsUrl = OUTPUTS_PATH
  ? new URL(OUTPUTS_PATH, `file://${process.cwd()}/`)
  : new URL('../amplify_outputs.json', import.meta.url);
console.log(`Using outputs: ${outputsUrl.pathname}`);
const outputs = JSON.parse(readFileSync(outputsUrl));
Amplify.configure(outputs);

const { isSignedIn } = await signIn({ username: SEED_EMAIL, password: SEED_PASSWORD });
if (!isSignedIn) {
  console.error('Sign-in did not complete (e.g. user needs to confirm sign-up or reset password).');
  process.exit(1);
}
await fetchAuthSession({ forceRefresh: true });

const client = generateClient({ authMode: 'userPool' });

async function seed() {
  console.log('Seeding posts...');
  for (const post of draftPosts) {
    const { errors } = await client.models.Post.create(post);
    if (errors) console.error(`  ✗ ${post.slug}`, errors);
    else console.log(`  ✓ ${post.slug}`);
  }

  console.log('Seeding products...');
  for (const product of draftProducts) {
    const { errors } = await client.models.Product.create(product);
    if (errors) console.error(`  ✗ ${product.name}`, errors);
    else console.log(`  ✓ ${product.name}`);
  }

  console.log('Done.');
}

seed().catch(console.error);
