const express = require("express");
const router = express.Router();
const {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers");
const { ctrlWrapper, validation } = require("../../middlewares");
const { contactShema } = require("../../schemas");

router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", validation(contactShema), ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(removeContact));

router.put("/:contactId", validation(contactShema), ctrlWrapper(updateContact));

module.exports = router;
