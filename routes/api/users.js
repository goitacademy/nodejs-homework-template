const express = require("express");

const { schemas } = require("../../models/User");

const { validation } = require("../../middlewares");

const { auth } = require("../../middlewares");

const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/signup", validation(schemas.add), ctrl.signup);

router.post("/login", validation(schemas.add), ctrl.login);

router.get("/current", auth, ctrl.current);

router.get("/logout", auth, ctrl.logout);

router.patch(
  "/subscription",
  auth,
  validation(schemas.sub),
  ctrl.subUpdateUser
);

module.exports = router;
