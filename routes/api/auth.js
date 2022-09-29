const { Router } = require("express");
const {
  validation,
  controllerWrapper: ctrlWrap,
} = require("../../middlewares");
const { joiSchema: usersSchema } = require("../../models/user");

const { authController: ctrl } = require("../../controllers");

const router = Router();

router.post("/register", validation(usersSchema), ctrlWrap(ctrl.register));

router.post("/login", validation(usersSchema), ctrlWrap(ctrl.login));

module.exports = router;
