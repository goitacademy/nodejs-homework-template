const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../../controllers/contacts");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const router = express.Router();
const { contactJoiSchema } = require("../../models/contact");
const validateBody = require("../../helpers/validateBody");

router.get("/", ctrlWrapper(listContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", validateBody(contactJoiSchema), ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(removeContact));

router.put(
  "/:contactId",
  validateBody(contactJoiSchema),
  ctrlWrapper(updateContact)
);

router.patch("/:contactId", ctrlWrapper(updateContactStatus));

module.exports = router;
