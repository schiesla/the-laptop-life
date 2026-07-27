import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  EmailSubscriber: a
    .model({
      email: a.email().required(),
      source: a.string(),
      subscribedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.guest().to(['create']),
      allow.authenticated().to(['read']),
    ]),

  Post: a
    .model({
      slug: a.string().required(),
      title: a.string().required(),
      excerpt: a.string(),
      category: a.string(),
      date: a.string(),
      readTime: a.string(),
      emoji: a.string(),
      body: a.string(),
      published: a.boolean().default(true),
      sortOrder: a.integer().default(0),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated().to(['create', 'read', 'update', 'delete']),
    ]),

  Product: a
    .model({
      name: a.string().required(),
      category: a.string(),
      price: a.string(),
      description: a.string(),
      emoji: a.string(),
      affiliateUrl: a.string(),
      badge: a.string(),
      published: a.boolean().default(true),
      sortOrder: a.integer().default(0),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated().to(['create', 'read', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});
