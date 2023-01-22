const express = require("express");
const { asyncMiddlewareWrapper } = require("@root/helpers");
const { validateBody } = require("@root/middlewares");
const contactsActions = require("@root/controllers");
const {
  addContactSchema,
  updateContactSchema,
} = require("@root/schemas/contacts");

const router = express.Router();

router.get("/", asyncMiddlewareWrapper(contactsActions.getAllContacts));

router.get(
  "/:contactId",
  asyncMiddlewareWrapper(contactsActions.getContactByID)
);

router.post(
  "/",
  validateBody(addContactSchema),
  asyncMiddlewareWrapper(contactsActions.addContact)
);

router.put(
  "/:contactId",
  validateBody(updateContactSchema),
  asyncMiddlewareWrapper(contactsActions.updateContact)
);

router.delete(
  "/:contactId",
  asyncMiddlewareWrapper(contactsActions.deleteContactByID)
);

module.exports = router;
