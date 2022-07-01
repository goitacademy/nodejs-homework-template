const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

router.get("/", asyncWrapper(listContacts));

router.get("/:contactId", asyncWrapper(getById));

router.post("/", addContactValidation, asyncWrapper(addContact));

router.delete("/:contactId", asyncWrapper(removeContact));

router.put("/:contactId", addContactValidation, asyncWrapper(updateContact));

router.put("/:contactId/favorite", asyncWrapper(updateStatusContact));

module.exports = router;
