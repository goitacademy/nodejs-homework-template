const express = require("express");

const authControllers = require("../../controllers/auth-controllers");

const authenticate = require("../../middlewares/authenticate");

const { schemas } = require("../../models/user");

const { validateBody } = require("../../utils/validateBody");

const router = express.Router();

// signup
router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  authControllers.register
);

// signin
router.post(
  "/login",
  validateBody(schemas.userLoginSchema),
  authControllers.login
);

// get current user
router.get("/current", authenticate, authControllers.getCurrent);

// logout
router.post("/logout", authenticate, authControllers.logout);

module.exports = router;
