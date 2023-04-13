const express = require("express");
const ctrl = require("../../controllers/auth-controller");
const authenticate = require("../../middelwares/authenticate");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

// signin
router.post("/users/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/users/current", authenticate, ctrl.getCurrent);

router.post("/users/logout", authenticate, ctrl.logout);

module.exports = router;
