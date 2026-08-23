import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

const uniqueProducts = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: "$120", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", description: "High-fidelity wireless sound with active noise cancellation." },
  { id: 2, name: "Smart Watch Series 7", category: "Electronics", price: "$250", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", description: "Advanced fitness tracking with an always-on Retina display." },
  { id: 3, name: "Portable Bluetooth Speaker", category: "Electronics", price: "$85", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400", description: "Crisp sound with deep bass and IPX7 waterproof rating." },
  { id: 4, name: "Mechanical Gaming Keyboard", category: "Electronics", price: "$110", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", description: "RGB backlit mechanical switches for ultra-fast response." },
  { id: 5, name: "Classic Sunglasses", category: "Fashion", price: "$60", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", description: "UV400 protection with stylish polarized lenses." },
  { id: 6, name: "Leather Travel Backpack", category: "Fashion", price: "$140", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", description: "Durable genuine leather laptop bag for everyday commute." },
  { id: 7, name: "Running Sneakers Pro", category: "Fashion", price: "$95", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", description: "Lightweight breathable mesh design with maximum cushioning." },
  { id: 8, name: "Minimalist Wrist Watch", category: "Fashion", price: "$180", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400", description: "Elegant stainless steel wrist watch with quartz movement." },
  { id: 9, name: "Ceramic Dinner Plate Set", category: "Home & Kitchen", price: "$45", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400", description: "Modern handcrafted ceramic plates for luxury dining." },
  { id: 10, name: "Stainless Steel Cutlery Set", category: "Home & Kitchen", price: "$35", image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400", description: "Mirror-polished luxury spoons, forks, and knives set." },
  { id: 11, name: "Modern Coffee Mug", category: "Home & Kitchen", price: "$20", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400", description: "Ergonomic ceramic mug perfect for espresso and tea." },
  { id: 12, name: "Electric Espresso Machine", category: "Home & Kitchen", price: "$210", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400", description: "Professional high-pressure coffee maker for home baristas." },
  { id: 13, name: "Ergonomic Office Chair", category: "Furniture", price: "$195", image: "https://images.unsplash.com/photo-1580481072645-022f9a6d8310?w=400", description: "High-back breathable mesh chair with adjustable lumbar support." },
  { id: 14, name: "Minimalist Desk Lamp", category: "Home & Kitchen", price: "$40", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", description: "Dimmable LED table lamp with eye-care lighting modes." },
  { id: 15, name: "Professional Basketball", category: "Sports", price: "$40", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400", description: "Official size composite leather basketball for indoor/outdoor play." },
  { id: 16, name: "Non-Slip Yoga Mat", category: "Sports", price: "$30", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400", description: "Extra thick eco-friendly fitness mat with alignment lines." },
  { id: 17, name: "Adjustable Dumbbell Set", category: "Sports", price: "$130", image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400", description: "Versatile weight set ideal for home strength training." },
  { id: 18, name: "Insulated Sport Water Bottle", category: "Sports", price: "$25", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400", description: "Double-wall vacuum stainless steel bottle keeps drinks cold." },
  { id: 19, name: "Wireless Charging Pad", category: "Accessories", price: "$30", image: "https://images.unsplash.com/photo-1622445268465-8432b10a6812?w=400", description: "Fast inductive charging station for smartphones and earbuds." },
  { id: 20, name: "Noise Cancelling Earbuds", category: "Accessories", price: "$110", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400", description: "Compact true wireless earbuds with immersive bass." },
  { id: 21, name: "Slim RFID Blocking Wallet", category: "Accessories", price: "$35", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400", description: "Sleek metallic card holder with anti-theft protection." },
  { id: 22, name: "HD Web Camera 1080p", category: "Accessories", price: "$55", image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400", description: "Clear video streaming camera with built-in microphone." },
  { id: 23, name: "Luxury Designer Handbag", category: "Fashion", price: "$220", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400", description: "Premium leather crossbody bag with elegant finish." },
  { id: 24, name: "Non-Stick Ceramic Frying Pan", category: "Home & Kitchen", price: "$50", image: "https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=400", description: "Eco-friendly scratch-resistant cooking pan for easy meals." }
];

const mockCategories = ["Electronics", "Fashion", "Home & Kitchen", "Sports", "Accessories"];

const mockFeedbacks = [
  { id: 1, user: "Ahmed", comment: "Great products and fast shipping!", rating: "⭐⭐⭐⭐⭐" },
  { id: 2, user: "Sara", comment: "Loved the smartwatch quality.", rating: "⭐⭐⭐⭐" },
  { id: 3, user: "Mohamed", comment: "Customer support was super helpful.", rating: "⭐⭐⭐⭐⭐" },
];

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = ({ cartItems }) => {
  const location = useLocation();
  const authPaths = ["/login", "/register", "/forgot-password", "/otp", "/new-password"];
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (authPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <svg className="logo-icon" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span>MyStore</span>
      </Link>
      <ul className="nav-links">
        <li><NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink></li>
        <li><NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Products</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink></li>
        <li><NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink></li>
        <li><NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink></li>
        <li>
          <Link to="/cart" className="nav-cart" style={{ textDecoration: "none" }}>
            🛒 <span className="cart-badge">{totalItems}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Footer = () => {
  const location = useLocation();
  const authPaths = ["/login", "/register", "/forgot-password", "/otp", "/new-password"];

  if (authPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>MyStore</h3>
          <p>Your ultimate destination for premium quality products and unbeatable everyday value.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <p>Facebook | Twitter | Instagram | LinkedIn</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
};

const Home = ({ addToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to MyStore</h1>
        <p>Discover luxury, style, and innovation curated specifically for your everyday lifestyle.</p>
      </section>

      <section className="categories-slider-container">
        <div className="categories-track">
          {mockCategories.concat(mockCategories).map((cat, idx) => (
            <Link key={idx} to={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`} className="category-card">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="banner-section">
        <h2>🔥 Mega Summer Sale - Up to 50% Off!</h2>
        <p>Use promo code <strong>SUMMER2026</strong> at checkout for exclusive savings.</p>
      </section>

      <section className="top-sales-section">
        <h2>Top Sales</h2>
        <div className="products-grid">
          {uniqueProducts.slice(0, 4).map((p) => (
            <div key={p.id} className="product-card" onClick={() => navigate(`/products/${p.id}`)}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">{p.price}</p>
              <p className="description">{p.description}</p>
              <button onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="feedback-section">
        <h2>What Our Customers Say</h2>
        <div className="feedback-grid">
          {mockFeedbacks.map((f) => (
            <div key={f.id} className="feedback-card">
              <h4>{f.user}</h4>
              <p>{f.rating}</p>
              <p className="comment">"{f.comment}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Products = ({ addToCart }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 12;
  const totalPages = Math.ceil(uniqueProducts.length / itemsPerPage);
  const currentProducts = uniqueProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="products-container">
      <div className="products-grid">
        {currentProducts.map((p) => (
          <div key={p.id} className="product-card" onClick={() => navigate(`/products/${p.id}`)}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">{p.price}</p>
            <p className="description">{p.description}</p>
            <button onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>&#8592; Back</button>
        <span>Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Forward &#8594;</button>
      </div>
    </div>
  );
};

const CategoryProducts = ({ addToCart }) => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const filteredProducts = uniqueProducts.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  return (
    <div className="products-container">
      <h2>Category: {categorySlug ? categorySlug.replace(/-/g, ' ').toUpperCase() : ""}</h2>
      {filteredProducts.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No products found in this category.</p>
      ) : (
        <div className="products-grid" style={{ marginTop: "20px" }}>
          {filteredProducts.map((p) => (
            <div key={p.id} className="product-card" onClick={() => navigate(`/products/${p.id}`)}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">{p.price}</p>
              <p className="description">{p.description}</p>
              <button onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const product = uniqueProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Product not found!</h2>;
  }

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.name} className="product-detail-image" />
      <div className="product-detail-info">
        <span className="product-detail-category">{product.category}</span>
        <h2>{product.name}</h2>
        <h3 className="price" style={{ fontSize: "28px", margin: "10px 0" }}>{product.price}</h3>
        <p className="description" style={{ fontSize: "16px", marginBottom: "24px", lineHeight: "1.6" }}>
          {product.description}
        </p>
        <button style={{ maxWidth: "200px" }} onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

const Cart = ({ cartItems, updateQuantity, removeFromCart, clearCart }) => {
  const [checkedOut, setCheckedOut] = useState(false);
  
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const priceNum = parseFloat(item.price.replace("$", ""));
      return sum + priceNum * item.quantity;
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    setCheckedOut(true);
    clearCart();
  };

  if (checkedOut) {
    return (
      <div className="login-container">
        <div className="login-card" style={{ textAlign: "center", maxWidth: "500px" }}>
          <h2 style={{ color: "#10b981" }}>Order Placed Successfully! 🎉</h2>
          <p className="login-subtitle" style={{ marginTop: "12px" }}>
            Thank you for shopping with MyStore. We are preparing your order for immediate dispatch.
          </p>
          <Link to="/products">
            <button className="login-btn" style={{ marginTop: "20px" }}>Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", margin: "60px 0" }}>
          <p style={{ color: "#94a3b8", fontSize: "18px" }}>Your cart is currently empty.</p>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <button style={{ maxWidth: "220px", marginTop: "20px" }}>Explore Products</button>
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="price">{item.price}</p>
                </div>
                <div className="cart-quantity-controls">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span style={{ color: "#10b981" }}>FREE</span>
            </div>
            <hr style={{ borderColor: "#334155", margin: "16px 0" }} />
            <div className="summary-row" style={{ fontSize: "20px", fontWeight: "bold" }}>
              <span>Total:</span>
              <span className="price">${calculateTotal()}</span>
            </div>
            <button className="login-btn" style={{ marginTop: "20px" }} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h2>About MyStore</h2>
        <p className="about-lead">
          Redefining online shopping through innovation, exceptional customer service, and uncompromised quality.
        </p>
      </section>

      <section className="about-content-grid">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            At MyStore, our mission is simple: to make premium lifestyle, fashion, and technology products accessible to everyone worldwide with seamless delivery and unmatched value.
          </p>
        </div>
        <div className="about-card">
          <h3>Our Vision</h3>
          <p>
            We aim to become the premier global e-commerce destination known for reliability, unmatched product variety, and dynamic customer-first services.
          </p>
        </div>
      </section>

      <section className="about-stats">
        <div className="stat-box">
          <h2>10k+</h2>
          <p>Happy Customers</p>
        </div>
        <div className="stat-box">
          <h2>500+</h2>
          <p>Premium Products</p>
        </div>
        <div className="stat-box">
          <h2>99.8%</h2>
          <p>On-Time Delivery</p>
        </div>
        <div className="stat-box">
          <h2>24/7</h2>
          <p>Dedicated Support</p>
        </div>
      </section>

      <section className="about-values">
        <h3>Why Choose Us?</h3>
        <div className="values-grid">
          <div className="value-item">
            <h4>Verified Quality</h4>
            <p>Every single product in our catalog undergoes strict quality testing before dispatch.</p>
          </div>
          <div className="value-item">
            <h4>Fast Shipping</h4>
            <p>Partnered with global logistics providers to guarantee rapid and secure packaging delivery.</p>
          </div>
          <div className="value-item">
            <h4>Customer Protection</h4>
            <p>100% secure payment transactions along with effortless 30-day hassle-free return policies.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="login-container">
      <div className="login-card" style={{ maxWidth: "500px" }}>
        <h2>Contact Us</h2>
        <p className="login-subtitle">We’d love to hear from you. Send us a message!</p>
        {submitted ? (
          <div style={{ color: "#10b981", textAlign: "center", fontWeight: "600", padding: "20px 0" }}>
            Thank you! Your message has been successfully sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="name@example.com" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                placeholder="How can we help you?"
                required
                rows="4"
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  background: "#0f172a",
                  color: "#f8fafc",
                  outline: "none",
                  fontFamily: "inherit"
                }}
              />
            </div>
            <button type="submit" className="login-btn">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Please enter your details to sign in.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div style={{ textAlign: "right", marginTop: "-10px", fontSize: "13px" }}>
            <Link to="/forgot-password" style={{ color: "#6366f1", textDecoration: "none" }}>Forgot Password?</Link>
          </div>
          <button type="submit" className="login-btn" disabled={!isFormValid}>Log In</button>
        </form>
        <p style={{ marginTop: "16px", fontSize: "14px", textAlign: "center", color: "#94a3b8" }}>
          Don't have an account? <Link to="/register" style={{ color: "#6366f1", fontWeight: "600" }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isFormValid = name.trim() !== "" && email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/otp", { state: { flow: "register" } });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>
        <p className="login-subtitle">Sign up to get started.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn" disabled={!isFormValid}>Register</button>
        </form>
        <p style={{ marginTop: "16px", fontSize: "14px", textAlign: "center", color: "#94a3b8" }}>
          Already have an account? <Link to="/login" style={{ color: "#6366f1", fontWeight: "600" }}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const isFormValid = email.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/otp", { state: { flow: "forgot-password" } });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Reset Password</h2>
        <p className="login-subtitle">Enter your email to receive an OTP code.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn" disabled={!isFormValid}>Send OTP</button>
        </form>
      </div>
    </div>
  );
};

const OTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const flow = location.state?.flow || "forgot-password";

  const isFormValid = otp.length === 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      if (flow === "register") {
        navigate("/login");
      } else {
        navigate("/new-password");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Enter OTP</h2>
        <p className="login-subtitle">We sent a 6-digit verification code to your email.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Verification Code</label>
            <input type="text" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" required />
          </div>
          <button type="submit" className="login-btn" disabled={!isFormValid}>Verify Code</button>
        </form>
      </div>
    </div>
  );
};

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const isFormValid = newPassword.trim() !== "" && confirmPassword.trim() !== "" && newPassword === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Set New Password</h2>
        <p className="login-subtitle">Enter your new password below.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn" disabled={!isFormValid}>Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <ScrollToTop />
      <Navbar cartItems={cartItems} />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/category/:categorySlug" element={<CategoryProducts addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}