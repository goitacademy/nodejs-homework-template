const express = require("express");
const router = new express.Router();

const { asyncWrapper } = require("../../Helpers/asyncWrapper");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  signupController,
  loginController,
  logoutController,
} = require("../../controllers/auth");

router.post("/signup", asyncWrapper(signupController));
router.post("/login", authMiddleware, asyncWrapper(loginController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));

module.exports = router;
