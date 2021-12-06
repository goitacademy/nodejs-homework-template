const express = require("express");

const { controlWrapper, validation } = require("../../middlewares");
const { auth: controllerContacts } = require("../../controller");
const { joiRegisterSchema, joiLoginSchema } = require("../../model/users");

const router = express.Router();

router.post(
  "/signup",
  validation(joiRegisterSchema),
  controlWrapper(controllerContacts.signup)
);

router.post(
  "/login",
  validation(joiLoginSchema),
  controlWrapper(controllerContacts.login)
);

module.exports = router;
