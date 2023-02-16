const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar
} = require("../../controllers/users");
const { validate } = require("../../middlewares/validateBody");
const {
  loginSchema,
  registerSchema,
  subscriptionSchema,
} = require("../../models/user");
const auth = require("../../middlewares/authMiddleware");

const upload = require("../../middlewears/uploadMiddl")

router.post("/register", validate(registerSchema), ctrlWrapper(registration));
router.post("/login", validate(loginSchema), ctrlWrapper(login));
router.get("/logout", auth, ctrlWrapper(logout));
router.get("/current", auth, ctrlWrapper(current));
router.patch(
  "/",
  auth,
  validate(subscriptionSchema),
  ctrlWrapper(updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);


module.exports = router;