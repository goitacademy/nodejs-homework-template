const express = require("express");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerschema), ctrl.register);

router.post("/login", validateBody(schemas.loginschema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/subscription", authenticate, ctrl.subscription);

module.exports = router;
