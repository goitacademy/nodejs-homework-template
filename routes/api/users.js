const express = require("express");

const {
  signup,
  login,
  logout,
  currentUser,
  updateSubscription,
  updateByAvatar,
} = require("../../controllers/users/index.js");
const { auth, upload } = require("../../middlewares/index.js");

const routerUsers = express.Router();

routerUsers.post("/signup", signup);
routerUsers.post("/login", login);
routerUsers.get("/logout", auth, logout);
routerUsers.get("/current", auth, currentUser);
routerUsers.patch("/", auth, updateSubscription);
routerUsers.patch("/avatars", auth, upload.single("avatar"), updateByAvatar);

module.exports = routerUsers;
