const express = require("express");
const router = express.Router();
const {
  validateBodyPost,
  //   validateBodyPut,
  //   validateBodyPatch,
  //   isValidId,
} = require("../../middlewares");

const ctrl = require("../../controllers/auth");

const { registerValidator } = require("../../models/user");

router.post("/register", validateBodyPost(registerValidator), ctrl.register);

module.exports = router;
