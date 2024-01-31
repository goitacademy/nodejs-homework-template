// const { Router } = require("express");
// const {
//   listContactsHandler,
//   getContactByIdHandler,
//   removeContactHandler,
//   addContactHandler,
//   updateContactHandler,
//   updateStatusContactHandler,
// } = require("../contacts/contacts.controllers");

// const {
//   contactValidationMiddleware,
// } = require("../contacts/contacts.validators");

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

// contactsRouter.patch("/:contactId/favorite", updateStatusContactHandler);

// module.exports = { contactsRouter };

// contacts.router.js

// contacts.router.js

const { Router } = require("express");
const {
  listContactsHandler,
  getContactByIdHandler,
  removeContactHandler,
  addContactHandler,
  updateContactHandler,
  updateStatusContactHandler,
} = require("../contacts/contacts.controllers");

const {
  contactValidationMiddleware,
} = require("../contacts/contacts.validators");

const { authMiddleware } = require("../auth/auth.middleware");

const contactsRouter = Router();

contactsRouter.get("/", authMiddleware, listContactsHandler);

contactsRouter.get("/:contactId", authMiddleware, getContactByIdHandler);

contactsRouter.post(
  "/",
  authMiddleware,
  contactValidationMiddleware,
  addContactHandler
);

contactsRouter.delete("/:contactId", authMiddleware, removeContactHandler);

contactsRouter.put(
  "/:contactId",
  authMiddleware,
  contactValidationMiddleware,
  updateContactHandler
);

contactsRouter.patch(
  "/:contactId/favorite",
  authMiddleware,
  updateStatusContactHandler
);

module.exports = contactsRouter;
