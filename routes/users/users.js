const express = require("express");
const middleW = require("../../middlewares");
const { schemas } = require("../../schemas");
const { userCtrl } = require("../../controlers");

const router = express.Router();

router.post(
  "/register",
  middleW.validateBody(schemas.registerSchema),
  userCtrl.register
);

router.post(
  "/login",
  middleW.validateBody(schemas.loginSchema),
  userCtrl.logIn
);

router.get("/current", middleW.autorization, userCtrl.getCurrent);

router.post("/logout", middleW.autorization, userCtrl.logOut);
router.patch(
  "/",
  middleW.autorization,
  middleW.validateBody(schemas.updateSubscription),
  userCtrl.updateSubscription
);
module.exports = router;
