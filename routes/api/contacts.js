const express = require("express");
const { asyncMiddlewareWrapper } = require("@root/helpers");
const contactsActions = require("@root/controllers");

const router = express.Router();

router.get("/", asyncMiddlewareWrapper(contactsActions.getAllContacts));

router.get(
  "/:contactId",
  asyncMiddlewareWrapper(contactsActions.getContactByID)
);

router.post("/", asyncMiddlewareWrapper(contactsActions.addContact));

router.put(
  "/:contactId",
  asyncMiddlewareWrapper(contactsActions.updateContact)
);

router.delete(
  "/:contactId",
  asyncMiddlewareWrapper(contactsActions.deleteContactByID)
);

module.exports = router;
