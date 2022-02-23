const express = require("express");
const userValidation = require("../../middlewares/userValidation");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { singupController } = require("../../controllers/usersController");

const usersRouter = express.Router();

usersRouter.get("/signup", userValidation, asyncWrapper(singupController));

module.exports = usersRouter;
