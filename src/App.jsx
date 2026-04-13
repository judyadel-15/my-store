import { useState } from "react";


export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "lap", price: 20000, category: "elect" },
    { id: 2, name: "phone", price: 2000, category: "elect" },
    { id: 3, name: "book", price: 200, category: "books" },
  ]);

  const [newProducts, setNewProducts] = useState({
    name: "",
    price: "",
    category: "",
  });

  const addProduct = () => {
    const product = {
      id: Date.now(),
      ...newProducts,
      price: Number(newProducts.price),
    };
    setProducts([...products, product]);
    setNewProducts({ name: "", price: "", category: "" }); // Reset all fields
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="App">
      <h2>All Products</h2>
      <div className="form">
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
        <input
          placeholder="category"
          value={newProducts.category}
          onChange={(e) => setNewProducts({ ...newProducts, category: e.target.value })}
        />
        <button onClick={addProduct}>Add</button>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <strong>{product.name}</strong> ({product.category}) 
              <br />
              <small>{product.price} EGP</small>
            </div>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}