const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");

const { validateBodyForPost, authenticate } = require("../../middleWare");

const schemas = require("../../schemas/auth");

router.post(
  "/register",
  validateBodyForPost(schemas.registerSchema),
  ctrl.register
);

router.post("/login", validateBodyForPost(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
