const express = require("express");
const ctrl = require("../../controllers/authContact");

const { validateBody, authentificate } = require("../../middlewares");

// const { authSchemas } = require("../../models/user");

const authSchemas = require("../../shemas/userSchema");

const router = express.Router();

// signup
router.post(
  "/register",
  validateBody(authSchemas.registerSchema, "update"),
  ctrl.register
);

// signin
router.post(
  "/login",
  validateBody(authSchemas.loginSchema, "update"),
  ctrl.login
);

router.get("/current", authentificate, ctrl.getCurrent);

router.post("/logout", authentificate, ctrl.logout);

module.exports = router;
