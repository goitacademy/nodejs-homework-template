const express = require("express");
const { tryCatchWrapper } = require("../../middleware");
const {
  login,
  logout,
  signup,
  getCurrent,
  subscriptionStatusUpdate,
  avatarUpdate,
} = require("../../controllers/auth.controller");
const { validation, auth, upload } = require("../../middleware");
const {
  userAuthSchema,
  subscriptionStatusSchema,
} = require("../../validationSchemas");

const router = express.Router();

router.post("/signup", validation(userAuthSchema), tryCatchWrapper(signup));
router.post("/login", validation(userAuthSchema), tryCatchWrapper(login));
router.get("/current", auth, tryCatchWrapper(getCurrent));
router.get("/logout", auth, tryCatchWrapper(logout));
router.patch(
  "/",
  auth,
  validation(subscriptionStatusSchema),
  tryCatchWrapper(subscriptionStatusUpdate)
);
router.patch(
  "/avatars",
  auth,
  tryCatchWrapper(upload.single("avatar")),
  tryCatchWrapper(avatarUpdate)
);

module.exports = router;
