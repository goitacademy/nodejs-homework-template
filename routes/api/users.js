const express = require("express");
const { validation, ctrlWrapper, authentication } = require("../../middleware");
const {
  users: { register, login, getCurrent, logout, updateSubscription },
} = require("../../controllers");

const { registerUserSchema, loginUserSchema } = require("../../schemas");
const router = express.Router();

const userRegisterValidation = validation(registerUserSchema);
const userLoginValidation = validation(loginUserSchema);

router.post("/register", userRegisterValidation, ctrlWrapper(register));
router.post("/login", userLoginValidation, ctrlWrapper(login));
router.get("/current", authentication, ctrlWrapper(getCurrent));
router.post("/logout", authentication, ctrlWrapper(logout));
router.patch("/users", authentication, ctrlWrapper(updateSubscription));

module.exports = router;
