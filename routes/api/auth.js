const express = require("express");

const routerAuth = express.Router();

const { auth: ctrl } = require("../../controllers/index");
const {
  userRegisterValidation,
  userLoginValidation,
} = require("../../middlewares/index");

routerAuth.post("/register", userRegisterValidation, ctrl.register);

routerAuth.post("/login", userLoginValidation, ctrl.login);

module.exports = routerAuth;
