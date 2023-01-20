const express = require("express");
const router = express.Router();

const {
  ctrlGetContacts,
  ctrlGetContactById,
  ctrlAddContact,
  // updateContact,
  // removeContact,
} = require("../../models/contacts");

const { addPostValidation } = require("../../middlewares/validationMiddleware");

router.get("/", ctrlGetContacts);

router.get("/:contactId", ctrlGetContactById);

router.post("/", ctrlAddContact);

// router.put("/:contactId", addPostValidation, addPostValidation, updateContact);

// router.delete("/:contactId", removeContact);

module.exports = router;
