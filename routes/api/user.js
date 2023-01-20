const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const {
  createContact,
  getContacts,
  me,
} = require("../../controllers/user.controller");

const { validateBody, auth } = require("../../middlewares/validation");
// const {
//   contactCreateValidationSchema,
//   contactUpdateStatusValidationSchema,
// } = require("../../schemas/contactValidationSchema");

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
userRouter.get("/me", tryCatchWrapper(auth), tryCatchWrapper(me));
// userRouter.get("/:id", tryCatchWrapper(getContact));
// userRouter.post(
//   "/",
//   validateBody(contactCreateValidationSchema),
//   tryCatchWrapper(createContact)
// );
// userRouter.delete("/:id", tryCatchWrapper(deleteContact));
// userRouter.put(
//   "/:id",
//   validateBody(contactCreateValidationSchema),
//   tryCatchWrapper(changeContact)
// );
// userRouter.patch(
//   "/:id/favorite",
//   validateBody(contactUpdateStatusValidationSchema),
//   tryCatchWrapper(updateStatusContact)
// );

module.exports = {
  userRouter,
};
