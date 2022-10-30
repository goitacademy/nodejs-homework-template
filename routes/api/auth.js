const express = require("express");
const { cntrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/Users");
const ctrl = require("../../controlers/auth");

const router = express.Router();
router.post(
  "/register",
  validateBody(schemas.registerSchems),
  cntrlWrapper(ctrl.registerContrl)
);
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  cntrlWrapper(ctrl.loginContrl)
);
router.get("/current", authenticate, cntrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, cntrlWrapper(ctrl.logOut));
module.exports = router;
