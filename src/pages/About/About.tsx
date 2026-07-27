import SEO from '../../components/SEO/SEO';
import EmailSignup from '../../components/EmailSignup/EmailSignup';
import './About.css';

export default function About() {
  return (
    <div>
      <SEO
        title="About"
        description="The Laptop Life is built by remote workers who test gear in real coffee shops, co-working spaces, and on the go — not just in a studio."
        path="/about"
      />
      <div className="about-header">
        <div className="container">
          <p className="section-label">Our story</p>
          <h1 className="section-title">When anywhere is your office</h1>
        </div>
      </div>

      <section className="section">
        <div className="container about-content">
          <p className="about-lead">
            The Laptop Life started because we kept getting burned by gear reviews that were clearly written by people who never left their home office.
          </p>
          <p className="about-copy">
            We work from coffee shops, trains, airport lounges, gyms, and living rooms — everywhere
            but a fixed desk. Every product we recommend has been used in those environments, not just
            unboxed for a photo shoot.
          </p>
          <p className="about-copy">
            We use affiliate links. When you click through and buy something, we earn a small
            commission — it doesn't change the price you pay, and it funds the next batch of testing.
            We never accept payment for positive reviews.
          </p>
          <p className="about-copy about-copy-last">
            The goal is simple: help you build a setup that lets you do your best work from
            anywhere, without spending more than you need to.
          </p>

          <div className="about-cta">
            <h2>Stay in the loop</h2>
            <p>Gear guides, honest reviews, and deal alerts. No spam.</p>
            <EmailSignup source="about-page" />
          </div>
        </div>
      </section>
    </div>
  );
}
