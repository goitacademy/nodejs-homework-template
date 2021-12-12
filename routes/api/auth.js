const express = require("express");

const { controlWrapper, validation, auth } = require("../../middlewares");
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

router.get("/logout", auth, controlWrapper(controllerContacts.logout));

module.exports = router;
