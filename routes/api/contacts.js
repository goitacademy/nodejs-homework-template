const express = require("express");

const ctrl = require("../../controllers/contactsControllers");

const {
  validateAddContact,
  validateUpdContact,
  validateUpdStatusContact,
} = require("../../validators/contactsValidators");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateAddContact, ctrl.addContact);

router.put("/:contactId", validateUpdContact, ctrl.updateContactById);

router.patch(
  "/:contactId/favorite",
  validateUpdStatusContact,
  ctrl.updateStatusContact
);
router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
