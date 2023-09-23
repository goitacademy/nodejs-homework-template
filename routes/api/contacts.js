const express = require("express");
const {
  validateData,
  validateStatusData,
} = require("../../middlewares/validateData");

const {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controlers/contacts");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateData, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateData, updateContact);

router.patch("/:contactId/favorite", validateStatusData, updateStatusContact);

module.exports = router;
