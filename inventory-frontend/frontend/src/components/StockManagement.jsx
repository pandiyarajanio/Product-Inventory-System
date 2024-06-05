import React, { useState } from "react";
import axios from "axios";

const StockManagement = ({ productId, subvariantId }) => {
  const [amount, setAmount] = useState("");

  const handleAddStock = async () => {
    try {
      await axios.post(
        `/api/api/products/${productId}/add-stock/${subvariantId}/`,
        { amount }
      );
      alert("Stock added successfully!");
    } catch (error) {
      alert("Error adding stock");
    }
  };

  const handleRemoveStock = async () => {
    try {
      await axios.post(
        `/api/api/products/${productId}/remove-stock/${subvariantId}/`,
        { amount }
      );
      alert("Stock removed successfully!");
    } catch (error) {
      alert("Error removing stock");
    }
  };

  return (
    <div className="amonut-section">
      <label className="Amount-style">
        Amount:
        <input
          type="number"
          className="Amount-input-style"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <button onClick={handleAddStock} className="btnOne">
        Add Stock
      </button>
      <button onClick={handleRemoveStock} className="btnOne amonut-remove-btn">
        Remove Stock
      </button>
    </div>
  );
};

export default StockManagement;
