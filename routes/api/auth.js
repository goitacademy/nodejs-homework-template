const express = require("express");
const { signup, login, logout } = require("../../controllers/auth");
const { authToken, validation, tryCatchWrapper } = require("../../middlewares");
const {
  signupUserJoiSchema,
  loginUserJoiSchema,
} = require("../../models/user");

const router = express.Router();

router
  .post(
    "/signup",
    validation("body", signupUserJoiSchema),
    tryCatchWrapper(signup)
  )
  .post(
    "/login",
    validation("body", loginUserJoiSchema),
    tryCatchWrapper(login)
  )
  .get("/logout", authToken, tryCatchWrapper(logout));

module.exports = router;
