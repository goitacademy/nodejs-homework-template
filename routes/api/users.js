const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../../controllers/users");
const { checkToken } = require("../../middlewares/index");
const { bodyValidator } = require("../../decorators/bodyValidator");
const {
  userRegisterSchema,
  userLoginSchema,
  avatarUpdateSchema,
} = require("../../schemas/users-schemas");
const { controlWrapper } = require("../../decorators");
const { uploader } = require("../../middlewares/uploader");
const uploadAvatar = require("../../controllers/users/uploadAvatar");
const { uploadAvatarSchema } = require("../../schemas/users-schemas");
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

router.patch("/avatars", checkToken, uploader, controlWrapper(uploadAvatar));

module.exports = router;
