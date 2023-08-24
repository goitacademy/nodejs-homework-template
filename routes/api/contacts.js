const express = require("express");

const contacts = require("../../controllers/contacts");

const router = express.Router();

const {isValidId} = require("../../midllewares");

router.get("/",  contacts.listContacts);

router.get("/:contactId", contacts.getContactById);

router.post("/", isValidId, contacts.addContact);

router.delete("/:contactId",  contacts.removeContact);

router.put("/:contactId", isValidId, contacts.updateContact);

router.patch("/:id/favorite", isValidId, contacts.updateFavorite);

module.exports = router;
