const express = require("express");

const authControllers = require("../../controllers/auth-controllers");
const router = express.Router();
const { validateBody } = require("../../utils/validateBody");
const { authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  authControllers.register
);

router.post(
  "/login",
  validateBody(schemas.userLoginSchema),
  authControllers.login
);

router.get("/current", authenticate, authControllers.getCurrent);

router.post("/logout", authenticate, authControllers.logout);

router.patch(
  "/:contactId/subscription",
  authenticate,
  validateBody(schemas.subscriptionUpdateSchema),
  authControllers.subscriptionUpdate
);

router.patch(
  "/avatars",
  upload.single("avatarURL"),
  authenticate,
  authControllers.avatarUpdate
);

module.exports = router;