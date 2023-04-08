const express = require("express");

const {
  getAllContacts,
  updateStatusContact,
  getContactById,
  addContact,
  updateContactById,
  deleteContact,
} = require("../../controllers/contactsControllers");

const {
  validateAddContact,
  validateUpdContact,
  validateUpdStatusContact,
} = require("../../validators/contactsValidators");

const router = express.Router();

router.get("/", getAllContacts);
router.post("/", validateAddContact, addContact);
router.get("/:contactId", getContactById);
router.put("/:contactId", validateUpdContact, updateContactById);
router.patch(
  "/:contactId/favorite",
  validateUpdStatusContact,
  updateStatusContact
);
router.delete("/:contactId", deleteContact);

module.exports = router;
