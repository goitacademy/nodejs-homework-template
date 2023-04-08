const express = require("express");

const {
  getAllContacts,
  updateStatusContact,
  getContactById,
  addContact,
  updateContactById,
  deleteContact,
} = require("../../controllers/contactsControllers");

// const {
//   validateAddContact,
//   validateUpdContact,
// } = require("../../validators/contactsValidators");

const router = express.Router();

router.get("/", getAllContacts);
router.post("/", addContact);
router.get("/:contactId", getContactById);
router.put("/:contactId", updateContactById);
router.patch("/:contactId/favorite", updateStatusContact);
router.delete("/:contactId", deleteContact);

module.exports = router;

// validateUpdContact,
// router.post("/", validateAddContact, add);
