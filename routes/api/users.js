const express = require("express");
const {
  registrationUser,
  loginUser,
  logoutUser,
  currentUser,
  subscriptionUser,
  changeAvatarUser,
  verifyUser,
  verifyBegineUser,
} = require("../../controllers/users");
const { validateBody } = require("../../middlewares/validation");
const {
  registerSchema,
  subscriptionSchema,
  verifyEmailSchema,
} = require("../../utils/validation/userValidationSchemas");
const { verefyToken } = require("../../middlewares/verefyToken");
const uploadFile = require("../../middlewares/upload");

const router = express.Router();

router.patch(
  "/",
  verefyToken,
  validateBody(subscriptionSchema),
  subscriptionUser
);
router.post("/register", validateBody(registerSchema), registrationUser);
router.post("/login", validateBody(registerSchema), loginUser);
router.post("/logout", verefyToken, logoutUser);
router.get("/current", verefyToken, currentUser);
router.patch(
  "/avatars",
  verefyToken,
  uploadFile.single("avatar"),
  changeAvatarUser
);
router.get("/verify/:verificationToken", verifyUser);
router.post("/verify", validateBody(verifyEmailSchema), verifyBegineUser);

module.exports = router;
