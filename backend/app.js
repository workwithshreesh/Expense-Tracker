const express = require("express");
const {connMongoose} = require("./conn");
const cors = require("cors");
const userAuth = require("./route/user");
const userExpense = require("./route/expense");

app = express();

app.use(cors({
    origin: "http://localhost:4200", 
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use("/auth",userAuth);
app.use("/exp",userExpense);

async function startServer(){
    try{

        const PORT = 3000;
        const url = "mongodb://localhost:27017/expenses"
        await connMongoose(url).then(()=>console.log("Mongodb is conected.."))
        app.listen(PORT,()=>console.log("server is started"))

    }catch (error){
        console.log(error, "error in server")                                                                                                                                                           
    }
}

startServer()






