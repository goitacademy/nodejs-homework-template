const express = require("express");
const {
  current,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  reverifyEmail,
} = require("../../controllers/users");
const {
  authToken,
  validation,
  tryCatchWrapper,
  upload,
} = require("../../middlewares");
const {
  subscriptionUserJoiSchema,
  reverifyUserJoiSchema,
} = require("../../models/user");

const router = express.Router();

router
  .get("/current", authToken, tryCatchWrapper(current))
  .patch(
    "/subscription",
    [authToken, validation("body", subscriptionUserJoiSchema)],
    tryCatchWrapper(updateSubscription)
  )
  .patch(
    "/avatars",
    [authToken, upload.single("avatar")],
    tryCatchWrapper(updateAvatar)
  )
  .get("/verify/:verificationToken", tryCatchWrapper(verifyEmail))
  .post(
    "/verify",
    validation("body", reverifyUserJoiSchema),
    tryCatchWrapper(reverifyEmail)
  );

module.exports = router;
