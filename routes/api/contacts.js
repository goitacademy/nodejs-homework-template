const express = require("express");
const contactsRouter = express.Router();

const {
  deleteContact,
  postContact,
  putContact,
  getContact,
  getContacts,
  updateStatusContact,
} = require("../../controllers/contactsController");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody, auth } = require("../../middlewares/index");
const {
  addContactSchema,
  addContactStatusSchema,
} = require("../../schemas/contactSchema.js");

contactsRouter.get("/", auth, tryCatchWrapper(getContacts));

contactsRouter.get("/:contactId", auth, tryCatchWrapper(getContact));

contactsRouter.post(
  "/",
  auth,
  validateBody(addContactSchema),
  tryCatchWrapper(postContact)
);

contactsRouter.delete("/:contactId", auth, tryCatchWrapper(deleteContact));

contactsRouter.put(
  "/:contactId",
  auth,
  validateBody(addContactSchema),
  tryCatchWrapper(putContact)
);

contactsRouter.patch(
  "/:contactId/favorite",
  auth,
  validateBody(addContactStatusSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = {
  contactsRouter,
};

