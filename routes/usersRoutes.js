// ========ROUTES======== //
const express = require("express");
const router = express.Router();

const {
  checkRegistrUserData,
  checkLoginUserData,
} = require("../middlewares/usersMiddlewares");
const { registrUser, loginUser } = require("../controllers/usersControllers");

// REGISTRATION ROUTE
router.post("/register", checkRegistrUserData, registrUser);

// LOGIN ROUTE
router.post("/login", checkLoginUserData, loginUser);

module.exports = router;
