const express = require("express");

const router = express.Router();

const { register, logIn, LogOut, currentUser } = require("../../controllers");

const { schemas } = require("../../models/user");
const { authenticate, validateBody } = require("../../middlewares");

router.post("/register", validateBody(schemas.userValidator), register);

router.post("/login", validateBody(schemas.userValidator), logIn);

router.post(
  "/logout",
  authenticate,
  validateBody(schemas.userValidator),
  LogOut
);

router.post(
  "/current",
  authenticate,
  validateBody(schemas.userValidator),
  currentUser
);

module.exports = router;
