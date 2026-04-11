
import { useState } from "react";
import "./index.css";

export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "lap", price: 20000, category: "الكترونيات" },
    { id: 2, name: "phone", price: 2000, category: "الكترونيات" },
    { id: 3, name: "book", price: 200, category: "كتب" },
  ]);

  const [newProducts, setNewProducts] = useState({
    name: "",
    price: "",
    category: "كتب", // Default category
  });

  // This creates the groups for your headings
  const grouped = products.reduce((acc, product) => {
    const cat = product.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  const addProduct = () => {
    const product = {
      id: Date.now(),
      ...newProducts,
      // Fixed: changed from setNewProducts.price to newProducts.price
      price: Number(newProducts.price),
    };

    setProducts([...products, product]);
    setNewProducts({ name: "", price: "", category: "كتب" });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="App">
      <h2>All Products</h2>
      
      <div className="input-container">
        <input
          placeholder="name"
          value={newProducts.name}
          onChange={(e) => setNewProducts({ ...newProducts, name: e.target.value })}
        />
        <input
          placeholder="price"
          type="number"
          value={newProducts.price}
          onChange={(e) => setNewProducts({ ...newProducts, price: e.target.value })}
        />
        <button onClick={addProduct}>Add</button>
      </div>

      <div className="product-list">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="category-title">{category}</h3>
            <ul>
              {items.map((p) => (
                <li key={p.id}>
                  <span>{p.name} - {p.price}</span>
                  <button onClick={() => deleteProduct(p.id)}>delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}