const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const {
  createContact,
  getContacts,
  current,
  updateStatusUser,
} = require("../../controllers/user.controller");

const { auth } = require("../../middlewares/validation");

const { validateBody } = require("../../middlewares/validation");
const {
  userUpdateStatusValidationSchema,
} = require("../../schemas/userValidationSchema");

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
  '/',
  tryCatchWrapper(auth),
  validateBody(userUpdateStatusValidationSchema),
  tryCatchWrapper(updateStatusUser)
);

module.exports = {
  userRouter,
};
