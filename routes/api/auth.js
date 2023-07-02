const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../middleware/contacts");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers");
const authenticate = require("../../middleware/authenticate");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/", authenticate, updateSubscription);

module.exports = router;
