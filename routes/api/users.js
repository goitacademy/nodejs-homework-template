// routes/api/users.js
const express = require("express");
const multer = require("multer");
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
} = require("../../schemas/users-schemas");
const { controlWrapper } = require("../../decorators");

const upload = multer({ dest: "tmp/" });

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
<<<<<<< HEAD
router.patch(
  "/avatars",
  checkToken,
  upload.single("avatar"),
  controlWrapper(updateAvatar)
);
=======
>>>>>>> parent of df708c3 (update 1)

module.exports = router;
