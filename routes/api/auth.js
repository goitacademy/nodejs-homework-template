const express = require("express");
const {
  register,
  login,
  logout,
  updateUserStatus,
  getCurrentUser,
} = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../helpers");
const { userAuth } = require("../../middlewares");
const { authSchema } = require("../../models");

const router = express.Router();

router.post("/register", validateBody(authSchema), ctrlWrapper(register));

router.post("/login", validateBody(authSchema), ctrlWrapper(login));

router.get("/current", userAuth, ctrlWrapper(getCurrentUser));

router.get("/logout", userAuth, ctrlWrapper(logout));

router.patch("/:id/subscription", userAuth, ctrlWrapper(updateUserStatus));

module.exports = router;
