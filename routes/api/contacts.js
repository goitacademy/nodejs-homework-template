const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../controllers/contacts");
const {
  validateContactBody,
  validateUpdateContactBody,
} = require("../../middlewares/validateBody");

router.get("/", listContacts);
router.get("/:id", getContactById);

router.post("/", validateContactBody, addContact);

router.put("/:id", validateUpdateContactBody, updateContact);

router.delete("/:id", removeContact);

module.exports = router;
