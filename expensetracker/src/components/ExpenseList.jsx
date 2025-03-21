import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("jwtmessage"); 

    axios.get(`http://localhost:3000/exp/Expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (Array.isArray(response.data.message)) {
          setExpenses(response.data.message);
        } else {
          console.error("Unexpected response format:", response.data);
          setExpenses([]);
        }
      })
      .catch(error => {
        console.error("Error fetching expenses:", error);
        setExpenses([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    const token = sessionStorage.getItem("jwtmessage");
    axios.delete(`http://localhost:3000/exp/Expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (Array.isArray(response.data.message)) {
          setExpenses(response.data.message);
        } else {
          console.error("Unexpected response format:", response.data);
          setExpenses([]);
        }
      })
      .catch(error => {
        console.error("Error deleting expense:", error);
      });
  };

  return (
    <div>
      <Link to="/add" className="btn btn-primary mb-3">Add Expense</Link>

      {loading ? (
        <p>Loading expenses...</p>
      ) : expenses.length === 0 ? (
        <div className="alert alert-warning text-center">
          <p>No expenses available. Please add a new expense.</p>
        </div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.expenseName}</td>
                <td>{expense.expenseDescription}</td>
                <td>${expense.expenseAmount}</td>
                <td>{expense.expenseDate}</td>
                <td>
                  <Link to={`/edit/${expense._id}`} className="btn btn-warning me-2">Edit</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(expense._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;
