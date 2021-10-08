const express = require('express');

const { joiSchema } = require("../../models/user");
const { controllerWrapper, validation, authenticate } = require('../../middlewares');
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

module.exports = router;

router.post("/users/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/users/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.get("/users/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/users/current", authenticate, controllerWrapper(ctrl.current));

module.exports = router;