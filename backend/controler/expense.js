const Expense = require("../models/expense");
const { findByIdAndDelete } = require("../models/user");
const bcrypt = require("bcrypt")

const AddNewExpense = async (req,res) =>{
    try{

        const {expenseName,
            expenseAmount,
            expenseDate,
            expenseDescription} = req.body;

        const userId = req.params.id

        if(!expenseName || !expenseAmount || !expenseDate || !expenseDescription || !userId){
            return res.status(404).json({message:"Bad Request"});
        }

        const addNew = new Expense({
            expenseName,
            expenseAmount,
            expenseDate,
            expenseDescription,
            user: userId
        });

        await addNew.save();

        return res.status(201).json({message:addNew});

    }catch (error){
        console.log(error, "error is in add new Expense func");
        throw error
    }
}


const UpdateExpense = async (req,res) => {
    try{

        const {expenseName,
            expenseAmount,
            expenseDate,
            expenseDescription} = req.body;

        const Id = req.params.id


        const updatedData = {}

        if (expenseName) updatedData.expenseName = expenseName;
        if (expenseAmount) updatedData.expenseAmount = expenseAmount;
        if (expenseDate) updatedData.expenseDate = expenseDate;
        if (expenseDescription) updatedData.expenseDescription = expenseDescription;


        const updateExpense = await Expense.findByIdAndUpdate(Id, updatedData, {new: true});

        if(!updateExpense){
            return res.status(404).json({message:"Expense is not created"});
        }

        return res.status(200).json({message:updateExpense})

    }catch (error){
        console.log(error, "error in update func");
        throw error
    }
}


const DeleteExpense = async (req,res) => {
    try{

        const Id = req.params.id;
        if(!Id){
            res.status(404).json({message:"Id is not found"})
        }

        const expense = await Expense.findByIdAndDelete(Id)
        if(!expense){
            return res.status(404).json({message:"Expense is deleted"});
        }

        return res.status(200).json({message:expense});

    }catch (error){
        console.log(error, "error in delete Expense");
        throw error
    }
}


const GetAllExpense = async (req,res) => {
    try{

        const Expenses = await Expense.find();
        if(!Expenses){
            return res.status(404).json({message:"Bad Methods"});
        }

        return res.status(200).json({message:Expenses});

    }catch(error){
        console.log(error, "error in get all Expense");
        throw error;
    }
}



const getExpenseById = async (req,res) => {
    try{

        const Id = req.params.id;
        console.log(Id)

        if(!Id){
            return res.status(404).json({message:"id is not provided"})
        }

        const expense = await Expense.findById(Id);
        console.log(expense)

        if(!expense){
            return res.status(404).json({message:"Expense is not found"});
        }

        return res.status(200).json({message:expense});


    }catch (error){
        console.log(error, "error in getExpenseById");
        throw error;
    }
}


const getExpenseByUserId = async (req,res) => {
    try{

        const Id = req.params.id;

        if(!Id){
            return res.status(404).json({message:"id is not provided"})
        }

        const expense = await Expense.find({user:Id});
        console.log(expense)

        if(!expense){
            return res.status(404).json({message:"Expense is not found"});
        }

        return res.status(200).json({message:expense});


    }catch (error){
        console.log(error, "error in getExpenseById");
        throw error;
    }
}


const openApi = async (req,res) =>{
    try{

        const body = req.body;
        if(!body){
            console.log("No body provided");
            return
        }
        var reverseString = body.expenseName
        console.log(reverseString)
        var rev = ""
        for(reverse of reverseString){
            rev = reverse + rev
        }

        

        n = reverseString.length
        count = 1
        var compressedString = ""
        for(i = 1; i<=n; i++){
            if(reverseString[i] == reverseString[i-1]){
                count ++
            }else{
                compressedString += reverseString[i-1] + String(count)
                count = 1
            }

        }

        // compressedString += rev[-1] + String(count)


        if(rev){
            const hashString = await bcrypt.hash(rev,10)
            console.log(hashString)
            return res.status(200).json({message:rev, hash:hashString, compressed:compressedString})
        }

    }catch(err){
        console.log(err)
    }
}


module.exports = {

    AddNewExpense,
    UpdateExpense,
    DeleteExpense,
    GetAllExpense,
    getExpenseById,
    getExpenseByUserId,
    openApi

}


