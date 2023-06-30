/* eslint-disable no-undef */
const express = require("express");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getcurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/subscription", authenticate, ctrl.subscription);

module.exports = router;
