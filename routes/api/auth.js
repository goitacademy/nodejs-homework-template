const express = require("express");
const { validateBody, authenticate } = require("../../middelwares");
const { schemasUser } = require("../../models");
const ctrl = require("../../controllers/auth");
const route = express.Router();

route.post("/register", validateBody(schemasUser.registerSchema), ctrl.register);
route.post("/login", validateBody(schemasUser.loginSchema), ctrl.login);
route.get("/current", authenticate, ctrl.getCurrent);
route.post("/logout", authenticate, ctrl.logout);
route.patch("/:id", validateBody(schemasUser.subscriptionSchema), ctrl.updateSubscription)

module.exports = route;