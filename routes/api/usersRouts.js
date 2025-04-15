const express = require("express");

const { users: cntr } = require("../../controllers");
const { auth, validation, upload } = require("../../middlewars");
const { cntrlWrap } = require("../../helpers");
const { joisubscriptionSchema } = require("../../models/user");

const usersRouter = express.Router();

usersRouter.post("/current", auth, cntrlWrap(cntr.currentUser));
usersRouter.patch(
  "/",
  auth,
  validation(joisubscriptionSchema),
  cntrlWrap(cntr.userSubscription)
);
usersRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  cntrlWrap(cntr.updateAvatar)
);

module.exports = usersRouter;
