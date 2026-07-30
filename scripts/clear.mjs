/**
 * Deletes all Post and Product records from the target backend.
 * Usage: OUTPUTS_PATH=.amplify-dev/amplify_outputs.json node scripts/clear.mjs
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { signIn, fetchAuthSession } from 'aws-amplify/auth';

config({ path: fileURLToPath(new URL('.env.local', import.meta.url)) });

const { SEED_EMAIL, SEED_PASSWORD, OUTPUTS_PATH } = process.env;
if (!SEED_EMAIL || !SEED_PASSWORD) {
  console.error('Missing SEED_EMAIL / SEED_PASSWORD.');
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
  console.error('Sign-in did not complete.');
  process.exit(1);
}
await fetchAuthSession({ forceRefresh: true });

const client = generateClient({ authMode: 'userPool' });

async function clearModel(name, model) {
  const { data } = await model.list();
  console.log(`Deleting ${data.length} ${name}...`);
  for (const item of data) {
    await model.delete({ id: item.id });
    console.log(`  ✗ ${item.id}`);
  }
}

await clearModel('Post', client.models.Post);
await clearModel('Product', client.models.Product);
console.log('Done.');
