const express = require("express");
const { current, updateSubscription } = require("../../controllers/users");
const { authToken, validation, tryCatchWrapper } = require("../../middlewares");
const { subscriptionUserJoiSchema } = require("../../models/user");

const router = express.Router();

router
  .get("/current", authToken, tryCatchWrapper(current))
  .patch(
    "/subscription",
    [authToken, validation("body", subscriptionUserJoiSchema)],
    tryCatchWrapper(updateSubscription)
  );

module.exports = router;
