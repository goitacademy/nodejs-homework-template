const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  register,
  login,
  logout,
  currentUser,
  changeAvatar,
} = require("../../controllers/authController");
const { addUserValidation } = require("../../middlewares/validationMiddleware");
const { auth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/uploadFile");

const router = express.Router();

router.post("/register", addUserValidation, asyncWrapper(register));
router.post("/login", addUserValidation, asyncWrapper(login));
router.post("/logout", asyncWrapper(auth), asyncWrapper(logout));
router.get("/current", asyncWrapper(auth), asyncWrapper(currentUser));

router.patch(
  "/avatars",
  asyncWrapper(auth),
  asyncWrapper(upload.single("avatar")),
  asyncWrapper(changeAvatar)
);

module.exports = router;
