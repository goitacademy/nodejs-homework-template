const express = require("express");

const { getContacts, getContactById,   addContact,
  updateContact, removeContact, updateStatusContact } = require("../../controllers");

const {validateBody, contactMiddlewares} = require('../../middlewares')

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(), addContact);

router.put("/:contactId", validateBody(), updateContact);

router.delete("/:contactId", removeContact);

// router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
