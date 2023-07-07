const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  current,
  changeSubscription,
} = require("../../controllers/auth");
const { validateRegisterBody, auth } = require("../../middlewares");
const { schemaSignup, schemaSubscription } = require("../../models/user");

router.post("/signup", validateRegisterBody(schemaSignup), signup);
router.post("/login", validateRegisterBody(schemaSignup), login);
router.get("/logout", auth, logout);
router.get("/current", auth, current);
router.patch(
  "/subscription",
  auth,
  validateRegisterBody(schemaSubscription),
  changeSubscription
);
module.exports = router;
