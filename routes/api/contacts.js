const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");

const router = express.Router();

router.get("/", tryCatchWrapper(listContacts));

router.get("/:contactId", tryCatchWrapper(getContactById));

router.post("/", tryCatchWrapper(addContact));

router.delete("/:contactId", tryCatchWrapper(removeContact));

router.put("/:contactId", tryCatchWrapper(updateContact));

router.patch("/:contactId/favorite", tryCatchWrapper(updateStatusContact));

module.exports = router;
