const express = require("express");
const router = express.Router();

const { validateSchema } = require("../../validate/validate");

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");

router.get("/", getAllContacts);
router.get("/:contactId", getContactById);
router.post("/", validateSchema, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", validateSchema, updateContact);

module.exports = router;
