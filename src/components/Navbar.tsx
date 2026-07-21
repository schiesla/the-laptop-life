import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <div className="container nav-inner">
        <NavLink to="/" className="nav-logo">
          The Laptop<span>Life</span>
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
