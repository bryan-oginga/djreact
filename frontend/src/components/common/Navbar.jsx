// src/components/common/Navbar.jsx
import { NavLink } from "react-router-dom";
import "../../assets/styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🎬 MovieFlix</div>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
         <li><NavLink to="/latest">Latest</NavLink></li>
        <li><NavLink to="/login">Login</NavLink> </li>
      </ul>
    </nav>
  );
}
export default Navbar;
