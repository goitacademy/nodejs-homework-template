const express = require("express");
const { validationBody, authenticate } = require("../../middlewares");
const {
  register,
  login,
  currentUser,
  logOut,
  updateSubscription,
} = require("../../api/contacts/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.patch("/", authenticate, updateSubscription);
router.post("/register", validationBody(schemas.registerSchema), register);
router.post("/login", validationBody(schemas.loginSchema), login);
router.post("/logout", authenticate, logOut);
router.get("/current", authenticate, currentUser);

module.exports = router;
