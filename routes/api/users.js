const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { usersSchema } = require("../../schemas/users");
const {
  registerUserController,
} = require("../../controller/users/registerUserController");
const {
  loginUserController,
} = require("../../controller/users/loginUserController");

const router = express.Router();

router.post(
  "/signup",
  validation(usersSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  "/login",
  validation(usersSchema),
  ctrlWrapper(loginUserController)
);

module.exports = router;
