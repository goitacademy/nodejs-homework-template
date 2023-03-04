const express = require("express");
const controllers = require("../../controller/auth");
const { ctrlWrapper } = require("../../helpers/index");
const { validateBody, authenticate } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../schema/contacts");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(controllers.register)
);

router.post(
  "/login",
  validateBody(loginSchema),
  ctrlWrapper(controllers.login)
);

router.post("/logout", authenticate, ctrlWrapper(controllers.logout));

router.get("/current", authenticate, ctrlWrapper(controllers.getCurrent));

module.exports = router;
