const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { users: ctrl } = require("../../controllers");
const {
  validateUser,
  authMiddleware,
  validateSubscription,
} = require("../../middlewares");

const router = express.Router();

router.post("/register", validateUser, ctrlWrapper(ctrl.register));

router.post("/login", validateUser, ctrlWrapper(ctrl.login));

router.post("/logout", authMiddleware, ctrlWrapper(ctrl.logout));

router.get("/current", authMiddleware, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  validateSubscription,
  authMiddleware,
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = { userRouter: router };
