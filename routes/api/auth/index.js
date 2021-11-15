const express = require("express");

const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../../middlewares");
const {
  register,
  login,
  logout,
  current,
} = require("../../../controllers/auth");
const { joiSchema } = require("../../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(register));
router.post("/login", validation(joiSchema), controllerWrapper(login));
router.get("/logout", authenticate, controllerWrapper(logout));
router.get("/current", authenticate, controllerWrapper(current));

module.exports = router;
