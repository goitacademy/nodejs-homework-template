const express = require("express");
const routerUser = express.Router();
const validate = require("../validator/validator");
const { auth } = require("../config/passport-jwt");

const {
  addUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controller/user");

routerUser.post("/users/signup", validate.userValid, addUser);
routerUser.post("/users/login", validate.userValid, loginUser);
routerUser.get("/users/logout", auth, logoutUser);
routerUser.get("/users/current", auth, getCurrentUser);

module.exports = routerUser;
