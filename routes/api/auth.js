const express = require("express");

const router = express.Router();

const { validateBody, autentificate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", autentificate, ctrl.getCurrent);

router.post("/logout", autentificate, ctrl.logout);

router.patch(
  "/:id/subscription",
  autentificate,
  validateBody(schemas.updatedSub),
  ctrl.updateSub
);

module.exports = router;
