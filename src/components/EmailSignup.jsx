import { useState } from 'react';

async function saveEmail(email, source) {
  // generateClient requires amplify_outputs.json to be present (deployed or sandbox).
  const { generateClient } = await import('aws-amplify/data');
  const client = generateClient();
  await client.models.EmailSubscriber.create({
    email,
    source,
    subscribedAt: new Date().toISOString(),
  });
}

export default function EmailSignup({ source = 'unknown' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | no-backend

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await saveEmail(email, source);
      setStatus('success');
      setEmail('');
    } catch (err) {
      // Backend not deployed yet (local dev without sandbox)
      if (err?.message?.includes('No current user') || err?.message?.includes('amplify_outputs')) {
        setStatus('no-backend');
      } else {
        console.error('Email signup error:', err);
        setStatus('error');
      }
    }
  };

  if (status === 'success') {
    return <p className="success-msg">You're in! Gear guides incoming.</p>;
  }

  if (status === 'no-backend') {
    return <p className="success-msg" style={{ color: 'var(--accent)' }}>Backend not deployed yet — run <code>npx ampx sandbox</code> to test locally.</p>;
  }

  return (
    <>
      <form className="email-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address"
        />
        <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Joining…' : 'Get Free Guides'}
        </button>
      </form>
      {status === 'error' && (
        <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Something went wrong — please try again.
        </p>
      )}
    </>
  );
}
