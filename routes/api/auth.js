const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const router = express.Router();

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);
router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/users/current", authenticate, ctrl.getCurrent);
router.get("/users/logout", authenticate, ctrl.logout);
module.exports = router;
