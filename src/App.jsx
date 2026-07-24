import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
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
  {
    id: 11,
    name: "Speaker",
    price: "$65",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300",
    description: "Portable Bluetooth speaker.",
  },
  {
    id: 12,
    name: "Desk Mat",
    price: "$25",
    image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=300",
    description: "Large protective desk pad.",
  },
  {
    id: 13,
    name: "Camera",
    price: "$450",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300",
    description: "HD digital camera.",
  },
  {
    id: 14,
    name: "Jacket",
    price: "$80",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300",
    description: "Classic denim jacket.",
  },
  {
    id: 15,
    name: "Candle",
    price: "$20",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=300",
    description: "Scented wax candle.",
  },
  {
    id: 16,
    name: "Laptop Sleeve",
    price: "$30",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300",
    description: "Padded laptop case.",
  },
  {
    id: 17,
    name: "Fitness Band",
    price: "$50",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300",
    description: "Heart rate tracker.",
  },
  {
    id: 18,
    name: "Earbuds",
    price: "$89",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300",
    description: "Wireless compact earbuds.",
  },
  {
    id: 19,
    name: "Notebook",
    price: "$12",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
    description: "Hardcover journal.",
  },
  {
    id: 20,
    name: "Wall Clock",
    price: "$30",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=300",
    description: "Minimalist clock.",
  },
];

const Navbar = () => (
  <nav className="navbar">
    <div className="nav-logo">My Store</div>
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
      </Routes>
    </Router>
  );
}
