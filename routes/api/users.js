const express = require("express");
const {
  current,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/users");
const {
  authToken,
  validation,
  tryCatchWrapper,
  upload,
} = require("../../middlewares");
const { subscriptionUserJoiSchema } = require("../../models/user");

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
  );

module.exports = router;
