const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
