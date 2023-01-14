const express = require("express");

const { controllerWrapper, validation } = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const {
  users: { signup, login },
} = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(signup));
router.post("/login", validation(joiSchema), controllerWrapper(login));

module.exports = router;
