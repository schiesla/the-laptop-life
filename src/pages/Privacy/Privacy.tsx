import { Prose } from '../../components/Prose/Prose';
import './Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-page">
      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: June 2026</p>

      <Prose>
        <div className="privacy-body">
          <h2>What we collect</h2>
          <p>When you sign up for our email list, we collect your email address. That's it.</p>

          <h2>How we use it</h2>
          <p>We use your email address to send you gear guides, reviews, and occasional deal alerts relevant to mobile remote work. We never sell your data.</p>

          <h2>Affiliate links</h2>
          <p>This site contains affiliate links. If you click through and make a purchase, we may earn a commission at no additional cost to you.</p>

          <h2>Cookies</h2>
          <p>We use minimal analytics to understand which content is most useful. No third-party ad tracking.</p>

          <h2>Unsubscribe</h2>
          <p>Every email includes an unsubscribe link. You can opt out at any time, instantly.</p>

          <h2>Contact</h2>
          <p>Questions about this policy? Reach us at <a href="mailto:contact@the-laptop-life.com">contact@the-laptop-life.com</a>.</p>
        </div>
      </Prose>
    </div>
  );
}
