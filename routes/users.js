const express = require("express");
const { users } = require("../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../models");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(validation(joiRegisterSchema), users.register);
router.route("/login").post(validation(joiLoginSchema), users.login);
router.route("/current").get(auth, users.getCurrent);

module.exports = router;
