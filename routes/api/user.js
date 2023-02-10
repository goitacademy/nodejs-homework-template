const express = require("express");
const { tryCatchWrapper } = require("../../utils/helpers/rtyCatchHelper");
const { current } = require("../../controllers/user.controller");
const { authToken } = require("../../utils/validation/validationToken");
const userRouter = express.Router();

userRouter.get(
  "/current",
  tryCatchWrapper(authToken),
  tryCatchWrapper(current)
);

module.exports = userRouter;
