const express = require("express");
const {AddNewExpense,
    UpdateExpense,
    DeleteExpense,
    GetAllExpense,
    getExpenseById,
    getExpenseByUserId,
    openApi } = require("../controler/expense");

const authenticateUser = require("../middlewares/authenticateUser");

const Router = express.Router();

Router.post("/openapi",openApi);
Router.post("/Expense/:id",authenticateUser,AddNewExpense);
Router.put("/Expense/:id",authenticateUser,UpdateExpense);
Router.delete("/Expense/:id",authenticateUser,DeleteExpense);
Router.get("/Expense",GetAllExpense);
Router.get("/Expense/:id",authenticateUser,getExpenseById);
Router.get("/Expenses/:id",authenticateUser,getExpenseByUserId);


module.exports = Router;