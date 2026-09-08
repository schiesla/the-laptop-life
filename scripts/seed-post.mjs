/**
 * Insert ONE post from src/data/published.ts into a backend, by slug, without
 * touching anything else. Safe for production: no full clear, and it removes any
 * pre-existing rows with the same slug first so it can't create duplicates.
 *
 * Usage:
 *   OUTPUTS_PATH=.amplify-main/amplify_outputs.json \
 *     node --experimental-strip-types scripts/seed-post.mjs <slug>
 *
 * Requires SEED_EMAIL / SEED_PASSWORD in scripts/.env.local pointing at a
 * confirmed Cognito user in THAT backend's user pool (Post create is
 * allow.authenticated() only).
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { signIn, fetchAuthSession } from 'aws-amplify/auth';
import { publishedPosts } from '../src/data/published.ts';

config({ path: fileURLToPath(new URL('.env.local', import.meta.url)) });

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node --experimental-strip-types scripts/seed-post.mjs <slug>');
  process.exit(1);
}

const post = publishedPosts.find((p) => p.slug === slug);
if (!post) {
  console.error(`No post with slug "${slug}" in src/data/published.ts`);
  process.exit(1);
}

const { SEED_EMAIL, SEED_PASSWORD, OUTPUTS_PATH } = process.env;
if (!SEED_EMAIL || !SEED_PASSWORD) {
  console.error('Missing SEED_EMAIL / SEED_PASSWORD in scripts/.env.local');
  process.exit(1);
}

const outputsUrl = OUTPUTS_PATH
  ? new URL(OUTPUTS_PATH, `file://${process.cwd()}/`)
  : new URL('../amplify_outputs.json', import.meta.url);
console.log(`Using outputs: ${outputsUrl.pathname}`);
Amplify.configure(JSON.parse(readFileSync(outputsUrl)));

const { isSignedIn } = await signIn({ username: SEED_EMAIL, password: SEED_PASSWORD });
if (!isSignedIn) {
  console.error('Sign-in did not complete.');
  process.exit(1);
}
await fetchAuthSession({ forceRefresh: true });

const client = generateClient({ authMode: 'userPool' });

const { data: existing, errors: listErrors } = await client.models.Post.list({
  filter: { slug: { eq: slug } },
});
if (listErrors) {
  console.error('List failed:', listErrors);
  process.exit(1);
}

for (const row of existing) {
  await client.models.Post.delete({ id: row.id });
  console.log(`  removed existing ${slug} (${row.id})`);
}

const { errors } = await client.models.Post.create(post);
if (errors) {
  console.error(`  ✗ ${slug}`, errors);
  process.exit(1);
}
console.log(`  ✓ ${slug} created`);
console.log('Done.');
