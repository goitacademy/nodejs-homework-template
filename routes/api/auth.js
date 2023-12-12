const express = require("express");
const { register, login, getCurrent } = require("../../controllers/index");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  register.register
);

router.post("/login", validateBody(schemas.loginSchema), login.login);

router.get("/current", authenticate, getCurrent.getCurrent);

router.post("/logout", authenticate, logouttt)

module.exports = router;
