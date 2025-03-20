import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddExpense = () => {
  const [expense, setExpense] = useState({
    expenseName: "",
    expenseDescription: "",
    expenseAmount: "",
    expenseDate: "",
  });

  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtmessage"); // Fetch token from local storage

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userId = sessionStorage.getItem("userId")
      const response = await axios.post(
        `http://localhost:3000/exp/Expense/${userId}`, // Update if needed
        expense,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 201 || response.status === 200) {
        console.log("Expense added successfully:", response.data);
        navigate("/"); // Redirect to the expense list page
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error adding expense:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="card p-4">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="expenseName"
            className="form-control"
            value={expense.expenseName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            name="expenseDescription"
            className="form-control"
            value={expense.expenseDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Amount</label>
          <input
            type="number"
            name="expenseAmount"
            className="form-control"
            value={expense.expenseAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="expenseDate"
            className="form-control"
            value={expense.expenseDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
