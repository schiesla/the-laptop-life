export default function UnderConstruction() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--black)',
      color: 'var(--white)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <p style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: 'var(--accent)',
        marginBottom: '1.5rem',
      }}>
        Coming Soon
      </p>
      <h1 style={{
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: 900,
        lineHeight: 1.1,
        letterSpacing: '-1.5px',
        marginBottom: '1.25rem',
      }}>
        The Laptop<span style={{ color: 'var(--accent)' }}>Life</span>
      </h1>
      <p style={{
        color: 'var(--gray-400)',
        fontSize: '1.1rem',
        maxWidth: 480,
        marginBottom: '0.75rem',
      }}>
        When anywhere is your office.
      </p>
      <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
        We're putting the finishing touches on something good. Check back soon.
      </p>
    </div>
  );
}
