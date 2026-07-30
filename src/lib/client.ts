import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

// Lazy singleton — defers creation until first use, after Amplify.configure() has run.
let _client: ReturnType<typeof generateClient<Schema>> | null = null;

export function getClient() {
  if (!_client) {
    _client = generateClient<Schema>();
  }
  return _client;
}
