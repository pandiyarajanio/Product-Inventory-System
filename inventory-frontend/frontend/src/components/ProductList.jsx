import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/api/products/list/");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="product-list-title">Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.ProductName}
            {product.variants.map((variant) => (
              <div key={variant.id}>
                <strong>{variant.name}:</strong>
                {variant.subvariants.map((subvariant) => (
                  <span key={subvariant.id}>
                    {subvariant.name} (Stock: {subvariant.stock})
                  </span>
                ))}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
