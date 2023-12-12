const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../../controllers/users");
const { checkToken } = require("../../middlewares/index");
const { updateAvatar } = require("../../controllers/users/updateAvatar");
const { bodyValidator } = require("../../decorators/bodyValidator");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../../schemas/users-schemas");
const { controlWrapper } = require("../../decorators");

const router = express.Router();

router.post(
  "/register",
  bodyValidator(userRegisterSchema, ["email", "password"]),
  controlWrapper(registerUser)
);

router.post(
  "/login",
  bodyValidator(userLoginSchema, ["email", "password"]),
  controlWrapper(loginUser)
);

router.post("/logout", checkToken, controlWrapper(logoutUser));

router.get("/current", checkToken, controlWrapper(getCurrentUser));

router.patch("/avatars", checkToken, controlWrapper(updateAvatar));

module.exports = router;
