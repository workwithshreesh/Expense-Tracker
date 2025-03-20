import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    expenseName: "",
    expenseDescription: "",
    expenseAmount: "",
    expenseDate: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/exp/Expense/${id}`)
      .then(response => setExpense(response.data))
      .catch(error => console.error("Error fetching expense:", error));
  }, [id]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/expenses/${id}`, expense)
      .then(() => navigate("/"))
      .catch(error => console.error("Error updating expense:", error));
  };

  return (
    <div className="card p-4">
      <h3>Edit Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="expenseName" className="form-control" value={expense.expenseName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input type="text" name="expenseDescription" className="form-control" value={expense.expenseDescription} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Amount</label>
          <input type="number" name="expenseAmount" className="form-control" value={expense.expenseAmount} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" name="expenseDate" className="form-control" value={expense.expenseDate} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Expense</button>
      </form>
    </div>
  );
};

export default EditExpense;
