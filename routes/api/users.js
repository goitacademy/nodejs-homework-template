const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/users");
const { validationBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

//Signup
router.post(
  "/signup",
  validationBody(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);

//Login
router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

//Logout
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

//Current
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));

module.exports = router;
