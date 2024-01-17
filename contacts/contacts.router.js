const { Router } = require("express");
const {
  listContactsHandler,
  getContactByIdHandler,
  removeContactHandler,
  addContactHandler,
  updateContactHandler,
  updateStatusContactHandler,
} = require("./contacts.controllers");

const { contactValidationMiddleware } = require("./contacts.validators");

const contactsRouter = Router();

contactsRouter.get("/", listContactsHandler);

contactsRouter.get("/:contactId", getContactByIdHandler);

contactsRouter.post("/", contactValidationMiddleware, addContactHandler);

contactsRouter.delete("/:contactId", removeContactHandler);

contactsRouter.put(
  "/:contactId",
  contactValidationMiddleware,
  updateContactHandler
);

contactsRouter.patch("/:contactId/favorite", updateStatusContactHandler);

module.exports = { contactsRouter };
