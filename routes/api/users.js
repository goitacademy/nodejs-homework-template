const express = require("express");
const { users: ctrl } = require('../../controllers')
const {joiSchema} = require("../../models/users")
const {validation, controllerWrapper, authenticate} = require("../../middlewares")

const router = express.Router();


router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup))
router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login))
router.get("/logout", authenticate, controllerWrapper(ctrl.logout))
router.get('/current', authenticate, controllerWrapper(ctrl.current))


module.exports = router;