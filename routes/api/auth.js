const express = require("express");
const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");
const { validateBody, auth } = require("../../middlewars");

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

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
