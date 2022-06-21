const express = require("express");
const {
  validationMiddleware,
  authMiddleware,
  uploadMiddleware,
} = require("../../middlewares");

const {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("../../models/user");
const router = express.Router();
const users = require("../../controllers/users");

router.patch(
  "/",
  authMiddleware,
  validationMiddleware(joiSubscriptionSchema),
  users.subscriptionUpdate
);

router.post("/signup", validationMiddleware(joiRegisterSchema), users.signup);

router.post("/login", validationMiddleware(joiLoginSchema), users.login);

router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  users.updateAvatar
);

router.get("/current", authMiddleware, users.getCurrent);

router.get("/logout", authMiddleware, users.logout);

module.exports = router;
