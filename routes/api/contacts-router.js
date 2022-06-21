const express = require("express");
const { asyncWrapper } = require("../../helpers/api-helpers");
const {
  validationContact,
} = require("../../middlewares/validation-middleware");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/api/contacts-controller.js");

const router = express.Router();

// get all contacts
router.get("/", asyncWrapper(listContacts));
// get contact by id
router.get("/:contactId", asyncWrapper(getContactById));
// add contact
router.post("/", validationContact, asyncWrapper(addContact));
// delete contact
router.delete("/:contactId", asyncWrapper(removeContact));
// update contact
router.put("/:contactId", validationContact, asyncWrapper(updateContact));

module.exports = router;
