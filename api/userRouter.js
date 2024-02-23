const express = require("express");
const routerUser = express.Router();
const validate = require("../validator/validator");
const passport = require("passport");

const { addUser, loginUser } = require("../controller/user");

routerUser.post("/users/signup", validate.userValid, addUser);
routerUser.post("/users/login" , validate.userValid,  loginUser);
routerUser.get("/users/logout");
routerUser.get("/users/current" , passport.authenticate("jwt", { session: false }));

module.exports = routerUser;
