import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
      <div className="container nav-inner">
        <NavLink to="/" className="nav-logo">
  <img src="/mark-bone.svg" alt="" width={22} height={22} />
  <span>The Laptop <em>Life</em></span>
</NavLink>
        <ul className="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/gear" className={({ isActive }) => isActive ? 'active' : ''}>Gear</NavLink></li>
          <li><NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
