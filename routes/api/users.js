const express = require("express");
const { validateSchema, ctrlWrapper, auth } = require("../../middlewares");
const { registerUserSchema, loginUserSchema } = require("../../models/users");
const router = express.Router();
const { users: ctrl } = require("../../controllers");

router.post(
  "/signup",
  validateSchema(registerUserSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validateSchema(loginUserSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
