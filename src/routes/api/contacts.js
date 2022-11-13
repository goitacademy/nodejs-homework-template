const express = require("express");
const router = express.Router();
const { tryCatchWrapper } = require("../../helpers");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationMiddleware");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

router.get("/", tryCatchWrapper(listContacts));

router.get("/:contactId", tryCatchWrapper(getContactById));

router.post("/", addContactValidation, tryCatchWrapper(addContact));

router.delete("/:contactId", tryCatchWrapper(removeContact));

router.put(
  "/:contactId",
  updateContactValidation,
  tryCatchWrapper(updateContact)
);

router.patch("/:contactId/favorite", tryCatchWrapper(updateStatusContact));

module.exports = router;
