const express = require("express");
const asyncHandler = require("express-async-handler");
const { addUserValidation, auth, upload } = require("../../middlevares");
const {
  register,
  login,
  logout,
  currentUser,
  subscription,
  avatars,
} = require("../../controllers");

const router = express.Router();

router.post("/register", addUserValidation, asyncHandler(register));
router.post("/login", addUserValidation, asyncHandler(login));
router.get("/logout", auth, asyncHandler(logout));
router.get("/current", auth, asyncHandler(currentUser));
router.patch("/", auth, addUserValidation, asyncHandler(subscription));
router.patch(
  "/avatars",
  auth,
  addUserValidation,
  upload.single("avatar"),
  asyncHandler(avatars)
);

module.exports = router;
