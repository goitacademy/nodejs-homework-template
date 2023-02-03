const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  changeStatus,

} = require("../../controllers/contacts.controllers");
const {
  addContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
} = require("../../schemas/contacts");
const { validateBody, auth } = require("../../middlewares/index");
const { tryCatchWrapper } = require("../../helpers");

const contactsRouter = express.Router();

contactsRouter.get("/", tryCatchWrapper(auth), tryCatchWrapper(getContacts));
contactsRouter.get(
  "/:contactId",
  tryCatchWrapper(auth),
  tryCatchWrapper(getContact)
);
contactsRouter.post(
  "/",
  tryCatchWrapper(auth),
  validateBody(addContactSchema),
  tryCatchWrapper(createContact)
);
contactsRouter.delete(
  "/:contactId",
  tryCatchWrapper(auth),
  tryCatchWrapper(deleteContact)
);
contactsRouter.put(
  "/:contactId",
  validateBody(updateContactSchema),
  tryCatchWrapper(auth),
  tryCatchWrapper(changeContact)
);
contactsRouter.patch(
  "/:contactId",
  validateBody(updateContactStatusSchema),
  tryCatchWrapper(auth),
  tryCatchWrapper(changeStatus)
);

module.exports = { contactsRouter };
