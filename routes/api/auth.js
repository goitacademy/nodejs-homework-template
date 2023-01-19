const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth")

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/users/signup", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post("/users/login", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.login));

router.get("/users/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/users/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;