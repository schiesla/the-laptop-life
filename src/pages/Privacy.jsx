export default function Privacy() {
  return (
    <div style={{ maxWidth: 740, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
      <h1 style={{ fontWeight: 900, fontSize: '2rem', marginBottom: '0.5rem' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--gray-400)', marginBottom: '2rem' }}>Last updated: June 2024</p>

      <div style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.2rem', margin: '2rem 0 0.5rem', color: 'var(--black)' }}>What we collect</h2>
        <p>When you sign up for our email list, we collect your email address. That's it.</p>

        <h2 style={{ fontWeight: 800, fontSize: '1.2rem', margin: '2rem 0 0.5rem', color: 'var(--black)' }}>How we use it</h2>
        <p>We use your email address to send you gear guides, reviews, and occasional deal alerts relevant to mobile remote work. We never sell your data.</p>

        <h2 style={{ fontWeight: 800, fontSize: '1.2rem', margin: '2rem 0 0.5rem', color: 'var(--black)' }}>Affiliate links</h2>
        <p>This site contains affiliate links. If you click through and make a purchase, we may earn a commission at no additional cost to you. We only recommend products we've actually used and believe in.</p>

        <h2 style={{ fontWeight: 800, fontSize: '1.2rem', margin: '2rem 0 0.5rem', color: 'var(--black)' }}>Cookies</h2>
        <p>We use minimal analytics to understand which content is most useful. No third-party ad tracking.</p>

        <h2 style={{ fontWeight: 800, fontSize: '1.2rem', margin: '2rem 0 0.5rem', color: 'var(--black)' }}>Unsubscribe</h2>
        <p>Every email includes an unsubscribe link. You can opt out at any time, instantly.</p>
      </div>
    </div>
  );
}
