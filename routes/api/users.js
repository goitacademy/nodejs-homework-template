const express = require("express");
const {
  signup,
  login,
  logout,
  currentUser,
  updateSubscription,
} = require("../../controllers/users/index.js");
const { auth } = require("../../middlewares/index.js");

const routerUsers = express.Router();

routerUsers.post("/signup", signup);
routerUsers.post("/login", login);
routerUsers.get("/logout", auth, logout);
routerUsers.get("/current", auth, currentUser);
routerUsers.patch("/", auth, updateSubscription);

module.exports = routerUsers;
