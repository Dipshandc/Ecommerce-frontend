import { Link } from "react-router-dom";
import "./Nav.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.svg" alt="logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {localStorage.getItem("token") != null ? (
          <li>
            <Link to="/login-register">Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login-register">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
