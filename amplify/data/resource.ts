import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  EmailSubscriber: a
    .model({
      email: a.email().required(),
      source: a.string(), // e.g. "hero", "newsletter-band", "blog-post"
      subscribedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.guest().to(['create']),       // anyone can subscribe
      allow.authenticated().to(['read']), // only authed admins can list
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});
