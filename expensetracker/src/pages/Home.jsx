import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";
import SummaryChart from "../components/SummaryChart";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div className="container mt-4">
      <button onClick={() => navigate("/add")} className="btn btn-success w-100 mb-3">
        + Add New Expense
      </button>

      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
      <SummaryChart expenses={expenses} />
    </div>
  );
};

export default Home;
