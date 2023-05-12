const express = require("express");
const router = express.Router();
const {
  validateBodyPost,

  //   validateBodyPut,
  //   validateBodyPatch,
  //   isValidId,
} = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { registerValidator, loginValidator } = require("../../models/user");

// Signup

router.post("/register", validateBodyPost(registerValidator), ctrl.register);

// Log In

router.post("/login", validateBodyPost(loginValidator), ctrl.login);

module.exports = router;
