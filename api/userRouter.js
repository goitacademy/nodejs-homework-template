const express = require("express")
const routerUser = express.Router()
const validate = require("../validator/validator");


const {
    addUser
    
  } = require("../controller/user");




routerUser.post("/users/signup", validate.userValid, addUser)
routerUser.post("/users/login")
routerUser.get("/users/logout")
routerUser.get("/users/current" )

module.exports = routerUser