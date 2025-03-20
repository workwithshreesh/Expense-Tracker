const mongoose = require("mongoose");

const expenses = new mongoose.Schema({
    expenseName:{
        type:String,
        required:true
    },
    expenseAmount:{
        type:String,
        required:true
    },
    expenseDate:{
        type:String,
        required:true
    },
    expenseDescription:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},
{timestamps:true}
);


const Expenses = mongoose.model("Expenses",expenses);

module.exports = Expenses