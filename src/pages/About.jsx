import EmailSignup from '../components/EmailSignup';

export default function About() {
  return (
    <div>
      <div style={{ background: 'var(--black)', color: 'var(--white)', padding: '4rem 0' }}>
        <div className="container">
          <p className="section-label">Our story</p>
          <h1 className="section-title" style={{ color: 'var(--white)' }}>
            When anywhere is your office
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 740 }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem', lineHeight: 1.5 }}>
            The Laptop Life started because we kept getting burned by gear reviews that were clearly written by people who never left their home office.
          </p>
          <p style={{ color: 'var(--gray-600)', marginBottom: '1.25rem' }}>
            We work from coffee shops, trains, airport lounges, gyms, and living rooms — everywhere
            but a fixed desk. Every product we recommend has been used in those environments, not just
            unboxed for a photo shoot.
          </p>
          <p style={{ color: 'var(--gray-600)', marginBottom: '1.25rem' }}>
            We use affiliate links. When you click through and buy something, we earn a small
            commission — it doesn't change the price you pay, and it funds the next batch of testing.
            We never accept payment for positive reviews.
          </p>
          <p style={{ color: 'var(--gray-600)', marginBottom: '3rem' }}>
            The goal is simple: help you build a setup that lets you do your best work from
            anywhere, without spending more than you need to.
          </p>

          <div style={{
            background: 'var(--black)',
            color: 'var(--white)',
            borderRadius: 12,
            padding: '2.5rem',
            textAlign: 'center',
          }}>
            <h2 style={{ fontWeight: 900, marginBottom: '0.75rem' }}>Stay in the loop</h2>
            <p style={{ color: 'var(--gray-400)', marginBottom: '1.75rem' }}>
              Gear guides, honest reviews, and deal alerts. No spam.
            </p>
            <EmailSignup source="about-page" />
          </div>
        </div>
      </section>
    </div>
  );
}
