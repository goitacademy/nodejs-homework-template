const express = require("express");

const ctrl = require("../../controllers/user");

const { userValidateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", userValidateBody(schemas.registerBody), ctrl.register);

router.post("/login", userValidateBody(schemas.loginBody), ctrl.logIn);

router.get("/current", authenticate, ctrl.userCurrent);

router.post("/logout", authenticate, ctrl.logOut);

router.patch(
  "/",
  authenticate,
  userValidateBody(schemas.updateSab),
  ctrl.updateSubscription
);

module.exports = router;
