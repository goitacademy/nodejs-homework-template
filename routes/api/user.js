const express = require("express");
const {
  createContact,
  getContacts,
  current,
  updateAvatar,
} = require("../../controllers/user.controller");

const { auth, upload, resizeAvatar } = require("../../middlewares/index");
const { tryCatchWrapper } = require("../../helpers");

const userRouter = express.Router();

userRouter.post(
  "/contacts",
  tryCatchWrapper(auth),
  tryCatchWrapper(createContact)
);
userRouter.get(
  "/contacts",
  tryCatchWrapper(auth),
  tryCatchWrapper(getContacts)
);
userRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(current));
userRouter.patch(
  "/avatars",
  tryCatchWrapper(auth),
  upload.single("avatar"),
  tryCatchWrapper(resizeAvatar),
  tryCatchWrapper(updateAvatar)
);

module.exports = { userRouter };
