const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");
const { schemasUser } = require("../../models/user");

router.post(
  "/register",
  validateBody(schemasUser.registerSchema),
  ctrl.register
);

router.post("/login", validateBody(schemasUser.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
module.exports = router;
