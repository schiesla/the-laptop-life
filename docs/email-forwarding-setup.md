# Email Forwarding Setup — contact@the-laptop-life.com

Forwards mail sent to `contact@the-laptop-life.com` to `schizzla27@gmail.com`, using AWS SES + S3 + Lambda. Built because hosting (Amplify) and the domain (Route53) were already on AWS, so email receiving stayed in the same account rather than moving DNS to a third party like Cloudflare.

## Why this approach
SES only handles *inbound* mail receiving in `us-east-1`, `us-west-2`, or `eu-west-1` — this setup uses `us-east-1`. SES can't forward mail directly; it can only drop the raw message in S3 and invoke a Lambda function, so the Lambda is what actually re-sends the email to Gmail.

## Components

**1. Route53 — MX record**
- Hosted zone: `the-laptop-life.com`
- Record: `MX`, value `10 inbound-smtp.us-east-1.amazonaws.com`
- Tells the internet SES handles mail for this domain. Coexists fine with the A/CNAME records Amplify uses for the website.

**2. SES — verified domain identity**
- `the-laptop-life.com` verified in SES (Easy DKIM enabled, records published to Route53 automatically via the console).

**3. S3 — inbound mail bucket**
- Bucket: `the-laptop-life-inbound-mail-637423601964-us-east-1-an`
- Bucket policy allows `ses.amazonaws.com` to `s3:PutObject`, scoped via an `aws:Referer` condition to this AWS account ID.
- Lifecycle rule: expires objects after 30 days (raw emails don't need to be kept once forwarded).

**4. SES — receipt rule set**
- Rule set: contains one rule matching recipient `contact@the-laptop-life.com`.
- Actions, in order:
  1. S3 — writes the raw email to the bucket above.
  2. Lambda — invoked (async/"Event" mode) after the S3 write, triggers the forwarder.
- Spam/virus scanning left on (SES's default filtering runs before the rule fires).
- Only one rule set can be active per AWS account at a time.

**5. Lambda — forwarder function**
- Function name: `SesForwarder`, runtime Node.js.
- Based on [`arithmetric/aws-lambda-ses-forwarder`](https://github.com/arithmetric/aws-lambda-ses-forwarder).
- **Gotcha hit**: file must be named `index.js`, not `index.mjs` — the library uses CommonJS (`require`/`module.exports`), and `.mjs` forces Node to treat it as an ES module, which throws `require is not defined in ES module scope`.
- Config used:
  ```js
  const config = {
    fromEmail: "contact@the-laptop-life.com",
    subjectPrefix: "",
    emailBucket: "the-laptop-life-inbound-mail-637423601964-us-east-1-an",
    emailKeyPrefix: "",
    forwardMapping: {
      "contact@the-laptop-life.com": ["schizzla27@gmail.com"]
    }
  };
  ```
- **Gotcha hit**: `emailBucket` must match the *real* bucket name exactly — AWS-generated bucket names can include account ID/region/random suffixes, which won't match a manually-typed placeholder name. Mismatch caused `Error: Could not make readable copy of email.` (an S3 `GetObject` failure logged generically by the library).

**6. IAM — Lambda execution role**
- Managed policy: `AWSLambdaBasicExecutionRole` (CloudWatch Logs write access).
- Inline policy:
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "ReadInboundMail",
        "Effect": "Allow",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::the-laptop-life-inbound-mail-637423601964-us-east-1-an/*"
      },
      {
        "Sid": "SendForwardedMail",
        "Effect": "Allow",
        "Action": "ses:SendRawEmail",
        "Resource": "*"
      }
    ]
  }
  ```
- `ses:SendRawEmail` is `Resource: "*"` because SES sending permissions aren't resource-scoped by ARN — this is expected, not overly broad.

## Mail flow
```
Sender → Route53 MX → SES (spam/virus check, recipient match)
       → S3 (raw email stored) → Lambda (SesForwarder)
       → SES SendRawEmail → schizzla27@gmail.com
```

## Verified working
Test email sent 2026-07-28 from an external Gmail account to `contact@the-laptop-life.com`, successfully forwarded and received in `schizzla27@gmail.com`.

## Where this address is referenced in the app
- [src/pages/Terms/Terms.tsx](../src/pages/Terms/Terms.tsx) — Contact section
- [src/pages/Privacy/Privacy.tsx](../src/pages/Privacy/Privacy.tsx) — Contact section
