const express = require("express");
const router = express.Router();

const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
} = require("../../middlewares/validationMiddleware");

const {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
} = require("../../controllers/contactsController");

router.get("/", getContactsList);
router.get("/:contactId", getContactById);
router.post("/", addContactValidation, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", updateContactValidation, updateContact);
router.patch("/:contactId/favorite", updateStatusValidation, updateStatus);

module.exports = router;
