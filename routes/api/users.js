const express = require("express");

const { register, login, logout } = require("../../controllers/users");

const { joiUserSchema } = require("../../models/user");

const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");

const router = express.Router();

const userValidationMiddleware = validation(joiUserSchema);

router.post("/signup", userValidationMiddleware, controllerWrapper(register));
router.post("/login", userValidationMiddleware, controllerWrapper(login));
router.get(
  "/logout",
  controllerWrapper(authenticate),
  controllerWrapper(logout)
);

module.exports = router;
