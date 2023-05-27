const express = require("express");
const router = express.Router();

const { validateBody } = require("../middlewares");
const { userSchema } = require("../utils/schemas");
const { createUser, login } = require("../controllers/usersControllers");

router.route("/register").post(validateBody(userSchema), createUser);
router.route("/login").post(validateBody(userSchema), login);

module.exports = { usersRouter: router };
