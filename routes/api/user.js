const express = require("express");
const userRouter = express.Router();
const { me } = require("../../controllers/user.controller");
const {
  validateBody,
  checkIfBodyExists,
  checkIfBodyStatusExists,
} = require("../../middleWares/checkBodyRequest");
const { auth } = require("../../middleWares/auth");
const {
  contactSchema,
  contactStatusSchema,
} = require("../../schema/validateSchema");
const { tryCatcher } = require("../../helpers/helpers");

// userRouter.get("/", tryCatcher(auth), tryCatcher(getListOfContacts));

// userRouter.get("/:contactId", tryCatcher(auth), tryCatcher(getContact));

userRouter.get("/me", tryCatcher(auth), tryCatcher(me));

// userRouter.post(
//   "/",
//   tryCatcher(auth),
//   validateBody(contactSchema),
//   tryCatcher(createContact)
// );

// userRouter.delete("/:contactId", tryCatcher(auth), tryCatcher(deleteContact));

// userRouter.patch(
//   "/:contactId/favorite",
//   tryCatcher(auth),
//   checkIfBodyStatusExists(),
//   validateBody(contactStatusSchema),
//   tryCatcher(updateStatusContact)
// );

// userRouter.put(
//   "/:contactId",
//   checkIfBodyExists(),
//   validateBody(contactSchema),
//   tryCatcher(editContact)
// );

module.exports = userRouter;
