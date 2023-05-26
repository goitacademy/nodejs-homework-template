const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

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
module.exports = router;
