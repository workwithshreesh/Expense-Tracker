import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("jwtmessage"); // Assuming you store auth token
  
    axios.get(`http://localhost:3000/exp/Expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (Array.isArray(response.data.message)) {
          setExpenses(response.data.message);
        } else {
          console.error("Unexpected response format:", response.data);
          setExpenses([]); // Set empty array if response is invalid
        }
      })
      .catch(error => {
        console.error("Error fetching expenses:", error);
        setExpenses([]); // Set empty array to prevent map() error
      });
  }, []);
  
  

  const handleDelete = (id) => {
    const token = sessionStorage.getItem("jwtmessage"); // Assuming you store auth token
    axios.delete(`http://localhost:3000/exp/Expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (Array.isArray(response.data.message)) {
          setExpenses(response.data.message);
        } else {
          console.error("Unexpected response format:", response.data);
          setExpenses([]); // Set empty array if response is invalid
        }
      })
      .catch(error => {
        console.error("Error fetching expenses:", error);
        setExpenses([]); // Set empty array to prevent map() error
      });
  };

  return (
    <div>
      <Link to="/add" className="btn btn-primary mb-3">Add Expense</Link>
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
    </div>
  );
};

export default ExpenseList;
