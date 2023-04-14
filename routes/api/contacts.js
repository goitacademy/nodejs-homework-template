const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsController");
const {
  validateGetById,
  validatePost,
  validateUpdate,
  validateDelete,
} = require("../../validators/validateData");

router.get("/", listContacts);

router.get("/:contactId", validateGetById, getContactById);

router.post("/", validatePost, addContact);

router.delete("/:contactId", validateDelete, removeContact);

router.put("/:contactId", validateUpdate, updateContact);

module.exports = router;
