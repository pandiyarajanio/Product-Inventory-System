import React from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import StockManagement from "./components/StockManagement";

function App() {
  return (
    <div className="App">
      <h1 className="Inventory-title">Inventory Management</h1>
      <ProductForm />
      <ProductList />
      <StockManagement productId={123} subvariantId={1235} />
    </div>
  );
}

export default App;
