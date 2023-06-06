const express = require('express');
const router = express.Router();

const validateBody = require('../../decorators/validateBody');
const { userValidationSchema } = require('../../schemas/userValidationSchema');
const {register, login, getCurrent, logout} = require("../../controllers/authControllers");
const authenticate = require("../../middlewares/authenticate");

router
.route("/register")
.post(validateBody(userValidationSchema), register);

router
.route("/login")
.post(validateBody(userValidationSchema), login);

router
.route("/current")
.get(authenticate, getCurrent)

router
.route("/logout")
.post(authenticate, logout);

module.exports = router