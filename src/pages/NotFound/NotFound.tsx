import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-header">
      <SEO title="Page Not Found" path="/404" />
      <div className="container">
        <p className="section-label">404</p>
        <h1 className="section-title">This page doesn't exist</h1>
        <p className="not-found-sub">
          The page you're looking for may have moved or never existed. Try one of these instead.
        </p>
        <div className="not-found-cta">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <Link to="/gear" className="btn btn-outline">Browse Gear</Link>
        </div>
      </div>
    </div>
  );
}
