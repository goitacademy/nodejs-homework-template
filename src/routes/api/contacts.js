const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../services/contactService");

const {
  postValidation,
  putValidation,
  patchValidation,
} = require("../../middlewares/validationMiddleware");

const router = new express.Router();

router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.post("/", postValidation, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", putValidation, updateContact);
router.patch("/:contactId/favorite", patchValidation, updateStatusContact);

module.exports = router;
