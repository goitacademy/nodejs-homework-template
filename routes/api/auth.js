const express = require('express');
const router = express.Router();

const validateBody = require('../../decorators/validateBody');
const { userValidationSchema } = require('../../schemas/userValidationSchema');
const {register} = require("../../controllers/authControllers");


router
.route("/register")
.post(validateBody(userValidationSchema), register);

module.exports = router