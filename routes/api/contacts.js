const express = require("express");
const {
  getContact,
  getContacts,
  deleteContact,
  createContact,
  updateContacts,
} = require("../../controllers/contacts.controllers");
const { validateBody } = require("../../middlewares/index");
const { tryCatchWrapper } = require("../../helpers/index");
const { addContactSchema } = require("../../schemas/contacts");

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
  validateBody(addContactSchema),
  tryCatchWrapper(updateContacts)
);

module.exports = contactsRouter;
