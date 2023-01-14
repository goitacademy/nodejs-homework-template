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
const { validateBody } = require("../../middlewares/index");
const { tryCatchWrapper } = require("../../helpers");

const contactsRouter = express.Router();

contactsRouter.get("/", tryCatchWrapper(getContacts));
contactsRouter.get("/:contactId", tryCatchWrapper(getContact));
contactsRouter.post(
  "/",
  validateBody(addContactSchema),
  tryCatchWrapper(createContact)
);
contactsRouter.delete("/:contactId", tryCatchWrapper(deleteContact));
contactsRouter.put(
  "/:contactId",
  validateBody(updateContactSchema),
  tryCatchWrapper(changeContact)
);
contactsRouter.patch(
  "/:contactId",
  validateBody(updateContactStatusSchema),
  tryCatchWrapper(changeStatus)
);

module.exports = contactsRouter;
