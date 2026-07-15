import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <span className="footer-logo">The Laptop<span>Life</span></span>
        <ul className="footer-links">
          <li><Link to="/gear">Gear</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
        </ul>
        <p className="footer-copy">
          © {new Date().getFullYear()} The Laptop Life. Some links are affiliate links.
        </p>
      </div>
    </footer>
  );
}
