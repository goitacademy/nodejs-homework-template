const express = require("express");

const {
  updateStatusValidation,
  changeContactValidation,
  addContactValidation,
} = require("../../utils/validation/postContactValidationSchema.js");

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(getContacts));
router.get("/:contactId", asyncWrapper(getContactById));
router.post("/", addContactValidation, asyncWrapper(addContact));
router.delete("/:contactId", asyncWrapper(removeContact));
router.put("/:contactId", changeContactValidation, asyncWrapper(updateContact));
router.patch(
  "/:contactId/favorite",
  updateStatusValidation,
  asyncWrapper(updateStatusContact)
);

module.exports = router;
