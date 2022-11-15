const express = require("express");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middleware/validationsMiddlewares");
const {
  getAllContacts,
  getContactById,
  deleteContactById,
  addNewContact,
  updateContactById,
} = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:contactId", getContactById);
router.post("/", addContactValidation, addNewContact);
router.delete("/:contactId", deleteContactById);
router.put("/:contactId", updateContactValidation, updateContactById);

module.exports = router;
