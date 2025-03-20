const express = require("express");
const {HandleLogin,
    HandleRegister,
    GetAllUser
             } = require("../controler/user");


const Router = express.Router();

Router.post("/register",HandleRegister);
Router.post("/login",HandleLogin);
Router.get("/users",GetAllUser)


module.exports = Router