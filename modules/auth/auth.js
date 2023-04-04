const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const {
  singUpShema,
  singInShchema
} = require("./auth.schemas");

const { register, login, currentUser ,logout} = require("./auth.controllers")
const { authorize } = require("../../middlewares/authorize");

const authController = express.Router()


authController.post("/users/register", validateBody(singUpShema), register);

authController.post("/users/login", validateBody(singInShchema), login);

authController.get("/users/current", authorize, currentUser);

authController.post("/users/logout", authorize, logout
);



module.exports = authController;
