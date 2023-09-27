const express = require("express");
const { validateBodyCreate, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const router = express.Router();

router.post(
  "/register",
  validateBodyCreate(schemas.registerSchema),
  ctrl.register
);

router.post("/login", validateBodyCreate(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
module.exports = router;
