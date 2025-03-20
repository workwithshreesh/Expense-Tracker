import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ExpenseList from "./components/ExpenseList";
import AddExpense from "./components/AddExpense";
import EditExpense from "./components/EditExpense";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ExpenseList />} />
            <Route path="/add" element={<AddExpense />} />
            <Route path="/edit/:id" element={<EditExpense />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
