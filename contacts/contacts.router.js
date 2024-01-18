// const express = require("express");
// const { Router } = require("express");
// const {
//   listContactsHandler,
//   getContactByIdHandler,
//   removeContactHandler,
//   addContactHandler,
//   updateContactHandler,
// } = require("./contacts.controllers");

// const { contactValidationMiddleware } = require("./contacts.validators");

// const contactsRouter = Router();

// contactsRouter.get("/", listContactsHandler);

// contactsRouter.get("/:contactId", getContactByIdHandler);

// contactsRouter.post("/", contactValidationMiddleware, addContactHandler);

// contactsRouter.delete("/:contactId", removeContactHandler);

// contactsRouter.put(
//   "/:contactId",
//   contactValidationMiddleware,
//   updateContactHandler
// );

// module.exports = { contactsRouter };

const express = require("express");
// const { Router } = require("express");
const {
  listContactsHandler,
  getContactByIdHandler,
  removeContactHandler,
  addContactHandler,
  updateContactHandler,
} = require("../contacts/contacts.controllers");

const {
  contactValidationMiddleware,
} = require("../contacts/contacts.validators");

const contactsRouter = express.Router();

contactsRouter.get("/", listContactsHandler);

contactsRouter.get("/:contactId", getContactByIdHandler);

contactsRouter.post("/", contactValidationMiddleware, addContactHandler);

contactsRouter.delete("/:contactId", removeContactHandler);

contactsRouter.put(
  "/:contactId",
  contactValidationMiddleware,
  updateContactHandler
);

module.exports = { contactsRouter };
