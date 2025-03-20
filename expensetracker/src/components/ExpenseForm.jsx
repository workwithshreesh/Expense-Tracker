import { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    addExpense({ id: Date.now(), title, amount: parseFloat(amount), category });
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <div className="mb-2">
        <label className="form-label">Title</label>
        <input 
          type="text" className="form-control" 
          placeholder="Enter title" value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Amount</label>
        <input 
          type="number" className="form-control" 
          placeholder="Enter amount" value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Category</label>
        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <button className="btn btn-primary w-100">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
