const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
  currentUser,
  updateSubscription,
} = require("../../controllers/controllersAuth");

const { authenticate, validateAuthBody } = require("../../middleware");

const {
  schemaRegister,
  schemaLogin,
  schemaUpdateSubscription,
} = require("../../models/user");

router.post("/register", validateAuthBody(schemaRegister), register);

router.post("/login", validateAuthBody(schemaLogin), login);

router.get("/current", authenticate, currentUser);

router.post("/logout", authenticate, logout);

router.patch(
  "/",
  authenticate,
  validateAuthBody(schemaUpdateSubscription),
  updateSubscription
);

module.exports = router;
