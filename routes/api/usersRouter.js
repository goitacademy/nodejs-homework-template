const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  authUserValidation,
  updateSubscriptionValidation,
} = require("../../utils/validation/userValidationSchema");

const { validationBody } = require("../../utils/validation/validationBody");

const {
  register,
  login,
  logout,
  current,
  updateSubscriptionUser,
} = require("../../controllers/usersController");

const { authMiddleware } = require("../../middlewares/authMiddleware");

router.post(
  "/register",
  validationBody(authUserValidation),
  asyncWrapper(register)
);

router.post("/login", validationBody(authUserValidation), asyncWrapper(login));

router.post("/logout", authMiddleware, asyncWrapper(logout));

router.get("/current", authMiddleware, asyncWrapper(current));

router.patch(
  "/subscription",
  authMiddleware,
  validationBody(updateSubscriptionValidation),
  asyncWrapper(updateSubscriptionUser)
);

module.exports = {
  usersRouter: router,
};
