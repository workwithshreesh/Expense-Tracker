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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch token from local storage (adjust if stored elsewhere)
  const token = sessionStorage.getItem("jwtmessage"); 

  useEffect(() => {
    console.log("Fetching Expense ID:", id);
    
    axios.get(`http://localhost:3000/exp/Expense/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {} // Only add Authorization if token exists
    })
      .then(response => {
        console.log("API Response:", response.data.message);
        if (response.data) {
          // Ensure that the fetched data exactly matches the expected structure
          setExpense({
            expenseName: response.data.message.expenseName || "",
            expenseDescription: response.data.message.expenseDescription || "",
            expenseAmount: response.data.message.expenseAmount || "",
            expenseDate: response.data.message.expenseDate || "",
          });
        } else {
          setError("Expense not found");
        }

      })
      .catch(error => {
        console.error("Error fetching expense:", error);
        setError("Failed to fetch expense");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/exp/Expense/${id}`, expense, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(() => {
        console.log("Expense Updated Successfully");
        navigate("/", { state: { reload: true } });
      })
      .catch(error => {
        console.error("Error updating expense:", error);
        setError("Failed to update expense");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card p-4">
      <h3>Edit Expense</h3>
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
        <button type="submit" className="btn btn-primary">Update Expense</button>
      </form>
    </div>
  );
};

export default EditExpense;
