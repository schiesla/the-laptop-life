import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
  <div className="footer-inner">
    <Link to="/" className="footer-mark">
      <img src={'/mark-bone.svg'} alt="" width="18" height="18" />
      <span>The Laptop <em>Life</em></span>
    </Link>
    <ul>
      <li><Link to="/gear">Gear</Link></li>
      <li><Link to="/blog">Blog</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/privacy">Privacy</Link></li>
      <li><Link to="/terms">Terms</Link></li>
    </ul>
    <p className="footer-legal">© {new Date().getFullYear()} The Laptop Life. Some links are affiliate links.</p>
  </div>
</footer>
  );
}
