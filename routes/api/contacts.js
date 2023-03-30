const express = require("express");

const {
  getAllContacts,
  getById,
  add,
  update,
  remove,
} = require("../../controllers/contactsControllers");

const {
  validateAddContact,
  validateUpdContact,
} = require("../../validators/contactsValidators");

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:contactId", getById);
router.post("/", add, validateAddContact);
router.put("/:contactId", update, validateUpdContact);
router.delete("/:contactId", remove);

module.exports = router;
