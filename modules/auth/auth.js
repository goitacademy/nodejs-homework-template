const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const {
  singUpShema,
  singInShchema
} = require("./auth.schemas");

const {
  register,
  login,
  currentUser,
  logout,
  changeAvatar,
} = require("./auth.controllers");
const { authorize } = require("../../middlewares/authorize");

const upload = require("../../middlewares/upload")

const authController = express.Router()




authController.post("/users/register", validateBody(singUpShema), register);

authController.post("/users/login", validateBody(singInShchema), login);

authController.get("/users/current", authorize, currentUser);

authController.post("/users/logout", authorize, logout);

authController.patch("/users/avatars",upload.single("avatar"), authorize, changeAvatar);




module.exports = authController;
