const express = require('express');

const { tryCatchWrapper } = require('../helpers/index.js');

const { register, login } = require('../controllers/index');

const { validateBody, addUserSchema, findUserSchema } = require("../middlewares/index");

const authRouter = express.Router();

authRouter.post(
    "/register",
    validateBody(addUserSchema),
    tryCatchWrapper(register)
);

authRouter.post("/login", validateBody(findUserSchema), tryCatchWrapper(login));

module.exports = { authRouter };