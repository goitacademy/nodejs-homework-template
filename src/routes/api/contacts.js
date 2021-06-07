const express = require("express");
const contactsController = require("../../controllers/contacts");
const {
  validateContactsCreate,
  validateContactsUpdate,
  validateContactsUpdateStatus,
} = require("../../validator/contacts");

const { guard } = require("../../helpers/guard");

const router = express.Router();

router
  .get("/", guard, contactsController.listContacts)
  .post("/", guard, validateContactsCreate, contactsController.addContact);

router
  .get("/:contactId", guard, contactsController.getContactById)
  .put(
    "/:contactId",
    guard,
    validateContactsUpdate,
    contactsController.updateContact
  )
  .delete("/:contactId", guard, contactsController.removeContact);

router.patch(
  "/:contactId/favorite",
  guard,
  validateContactsUpdateStatus,
  contactsController.updateStatusContact
);

module.exports = router;
