const express = require("express");
const { users } = require("../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../models");
const validation = require("../middlewares/validation");

const router = express.Router();

router.route("/register").post(validation(joiRegisterSchema), users.register);
router.route("/login").post(validation(joiLoginSchema), users.login);

module.exports = router;
