const express = require("express");
const router = express.Router();
const { controllerWrapper, validation } = require("../../middlewares");
const { joiSchema } = require("../../schemas/user");
const { auth: ctrl } = require("../../controllers");

router.post("/register", validation(joiSchema), controllerWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), controllerWrapper(ctrl.signin));
router.get("/logout", controllerWrapper(ctrl.logout));

module.exports = router;
