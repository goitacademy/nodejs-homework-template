const express = require("express");
const { validateBody, authentication } = require("../../middlewares");
const { schemas } = require("../../models");
const ctrl = require("../../controllers/auth");
const router = express.Router();

router.post("/signup", validateBody(schemas.registrationSchema), ctrl.signup);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authentication, ctrl.getCurrent);

router.post("/logout", authentication, ctrl.logout);

router.patch("/", authentication, ctrl.updateSubscription);

module.exports = router;
