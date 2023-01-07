const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
} = require("../../controllers/contacts.controllers");
const {
  addContactSchema,
  updateContactSchema,
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

module.exports = contactsRouter;
