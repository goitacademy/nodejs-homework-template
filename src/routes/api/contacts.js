const express = require("express");
const contactsController = require("../../controllers/contacts");
const {
  validateContactsCreate,
  validateContactsUpdate,
  validateContactsUpdateStatus,
} = require("../../validator/contacts");

const router = express.Router();

router
  .get("/", contactsController.listContacts)
  .post("/", validateContactsCreate, contactsController.addContact);

router
  .get("/:contactId", contactsController.getContactById)
  .put("/:contactId", validateContactsUpdate, contactsController.updateContact)
  .delete("/:contactId", contactsController.removeContact);

router.patch(
  "/:contactId/favorite",
  validateContactsUpdateStatus,
  contactsController.updateStatusContact
);

module.exports = router;
