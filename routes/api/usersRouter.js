const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  registrationController,
  logInController,
  logOutController,
  currentUserController,
} = require("../../controllers/usersController");

router.post("/register", asyncWrapper(registrationController));
router.post("/login", asyncWrapper(logInController));
router.post("/logout", authMiddleware, asyncWrapper(logOutController));
router.post("/current", authMiddleware, asyncWrapper(currentUserController));

module.exports = {
  usersRouter: router,
};
