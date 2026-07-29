import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

// --- Mock Data ---
const mockProducts = [
  { id: 1, name: "Headphones", price: "$99", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300", description: "Noise-canceling sound." },
  { id: 2, name: "Smart Watch", price: "$149", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300", description: "Fitness & health tracker." },
  { id: 3, name: "Running Shoes", price: "$85", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300", description: "Comfortable sport shoes." },
  { id: 4, name: "Sunglasses", price: "$45", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300", description: "Stylish UV protection." },
  { id: 5, name: "Backpack", price: "$120", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300", description: "Durable travel bag." },
  { id: 6, name: "Keyboard", price: "$75", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300", description: "Tactile RGB keyboard." },
  { id: 7, name: "Mouse", price: "$35", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300", description: "Wireless ergonomic mouse." },
  { id: 8, name: "Coffee Mug", price: "$15", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300", description: "Ceramic heat-retention mug." },
];

const mockCategories = ["Electronics", "Fashion", "Sports", "Home & Kitchen", "Accessories"];

const mockFeedbacks = [
  { id: 1, user: "Ahmed", comment: "Great products and fast shipping!", rating: "⭐⭐⭐⭐⭐" },
  { id: 2, user: "Sara", comment: "Loved the smartwatch quality.", rating: "⭐⭐⭐⭐" },
  { id: 3, user: "Mohamed", comment: "Customer support was super helpful.", rating: "⭐⭐⭐⭐⭐" },
];

// --- Navbar Component ---
const Navbar = () => (
  <nav className="navbar">
    <div className="nav-logo">
      <svg className="logo-icon" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span>My Store</span>
    </div>
    <ul className="nav-links">
      <li><NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
      <li><NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink></li>
      <li><NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Products</NavLink></li>
      <li><NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink></li>
      <li><NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink></li>
      <li><NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink></li>
    </ul>
  </nav>
);

// --- Home Page ---
const Home = () => {
  return (
    <div className="home-container">
      {/* 1. Hero / Header Section */}
      <section className="hero-section" style={{ textAlign: "center", padding: "40px 20px", background: "#e9ecef", borderRadius: "12px", marginBottom: "30px" }}>
        <h1>Welcome to Our Store</h1>
        <p>Discover the best deals on your favorite electronics and accessories.</p>
      </section>

      {/* 2. Categories Section */}
      <section className="categories-section" style={{ marginBottom: "40px" }}>
        <h2>Categories</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
          {mockCategories.map((cat, idx) => (
            <span key={idx} style={{ padding: "8px 16px", background: "#ffffff", border: "1px solid #ced4da", borderRadius: "20px", fontWeight: "500" }}>
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* 3. Promotional Banner / Slider */}
      <section className="banner-section" style={{ padding: "30px", background: "#0d6efd", color: "#fff", borderRadius: "12px", textAlign: "center", marginBottom: "40px" }}>
        <h2>🔥 Mega Summer Sale - Up to 50% Off!</h2>
        <p>Use code SUMMER2026 at checkout.</p>
      </section>

      {/* 4. Top Sales Products Section (~4 items) */}
      <section className="top-sales-section" style={{ marginBottom: "40px" }}>
        <h2>Top Sales</h2>
        <div className="products-grid" style={{ marginTop: "16px" }}>
          {mockProducts.slice(0, 4).map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">{p.price}</p>
              <p className="description">{p.description}</p>
              <button>Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. All Products Section (~8 items) */}
      <section className="all-products-section" style={{ marginBottom: "40px" }}>
        <h2>All Products</h2>
        <div className="products-grid" style={{ marginTop: "16px" }}>
          {mockProducts.slice(0, 8).map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">{p.price}</p>
              <p className="description">{p.description}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Customer Feedback Section */}
      <section className="feedback-section" style={{ marginBottom: "40px" }}>
        <h2>What Our Customers Say</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "16px" }}>
          {mockFeedbacks.map((f) => (
            <div key={f.id} style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e9ecef" }}>
              <h4>{f.user}</h4>
              <p>{f.rating}</p>
              <p style={{ color: "#6c757d", fontSize: "14px" }}>"{f.comment}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- Products Page ---
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
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>&#8592; Back</button>
        <span>Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Forward &#8594;</button>
      </div>
    </div>
  );
};

// --- Login Page ---
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <input type="email" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div style={{ textAlign: "right", marginTop: "-10px", fontSize: "13px" }}>
            <Link to="/forgot-password" style={{ color: "#0d6efd", textDecoration: "none" }}>Forgot Password?</Link>
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>
        <p style={{ marginTop: "16px", fontSize: "14px", textAlign: "center" }}>
          Don't have an account? <Link to="/register" style={{ color: "#0d6efd", fontWeight: "600" }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

// --- Register Page ---
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/otp");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>
        <p className="login-subtitle">Sign up to get started.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn">Register</button>
        </form>
        <p style={{ marginTop: "16px", fontSize: "14px", textAlign: "center" }}>
          Already have an account? <Link to="/login" style={{ color: "#0d6efd", fontWeight: "600" }}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

// --- OTP Page ---
const OTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Enter OTP</h2>
        <p className="login-subtitle">We sent a verification code to your email.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="otp">Verification Code</label>
            <input type="text" id="otp" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" required />
          </div>
          <button type="submit" className="login-btn">Verify Code</button>
        </form>
      </div>
    </div>
  );
};

// --- Forgot Password Page ---
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/otp");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Reset Password</h2>
        <p className="login-subtitle">Enter your email to receive an OTP code.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn">Send OTP</button>
        </form>
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About Us</h1>} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<h1>Contact Us</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}