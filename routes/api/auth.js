const express = require('express');

const { joiSchema, joiSubscrSchema } = require("../../models/user");
const { controllerWrapper, validation, authenticate, upload } = require('../../middlewares');

const { auth: ctrl } = require("../../controllers");

const router = express.Router();

module.exports = router;

router.post("/users/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/users/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.get("/users/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/users/current", authenticate, controllerWrapper(ctrl.current));

router.patch('/users', authenticate, validation(joiSubscrSchema), controllerWrapper(ctrl.updateSubscr));

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.avatars);

module.exports = router;