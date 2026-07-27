import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    name: "Headphones",
    price: "$99",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
    description: "Noise-canceling sound.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$149",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
    description: "Fitness & health tracker.",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: "$85",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
    description: "Comfortable sport shoes.",
  },
  {
    id: 4,
    name: "Sunglasses",
    price: "$45",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300",
    description: "Stylish UV protection.",
  },
  {
    id: 5,
    name: "Backpack",
    price: "$120",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
    description: "Durable travel bag.",
  },
  {
    id: 6,
    name: "Keyboard",
    price: "$75",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300",
    description: "Tactile RGB keyboard.",
  },
  {
    id: 7,
    name: "Mouse",
    price: "$35",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
    description: "Wireless ergonomic mouse.",
  },
  {
    id: 8,
    name: "Coffee Mug",
    price: "$15",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300",
    description: "Ceramic heat-retention mug.",
  },
  {
    id: 9,
    name: "Water Bottle",
    price: "$25",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300",
    description: "Insulated stainless steel.",
  },
  {
    id: 10,
    name: "Desk Lamp",
    price: "$40",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300",
    description: "Adjustable LED light.",
  },
];

const Navbar = () => (
  <nav className="navbar">
    <div className="nav-logo">
      {/* Sample SVG logo — replace src or SVG content with your own logo */}
      <svg
        className="logo-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="28"
        height="28"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span>My Store</span>
    </div>
    <ul className="nav-links">
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
      </li>
    </ul>
  </nav>
);

const Products = () => {
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState(0);

  const totalPages = Math.ceil(mockProducts.length / 10);
  const currentProducts = mockProducts.slice((page - 1) * 10, page * 10);

  return (
    <div className="products-container">
      <div className="cart-summary">
        🛒 Cart: <strong>{cart}</strong>
      </div>

      <div className="products-grid">
        {currentProducts.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">{p.price}</p>
            <p className="description">{p.description}</p>
            <button onClick={() => setCart(cart + 1)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &#8592; Back
        </button>
        <span>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Forward &#8594;
        </button>
      </div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirects to the Home page on submit
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Please enter your details to sign in.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="page">
              <h1>Home Page</h1>
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="page">
              <h1>About Us</h1>
            </div>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route
          path="/contact"
          element={
            <div className="page">
              <h1>Contact Us</h1>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}