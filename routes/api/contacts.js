const express = require("express");
const ctrlContacts = require("../../controllers/contacts");

const router = express.Router();


router.get("/", ctrlContacts.get);

router.get('/:contactId', ctrlContacts.getById);

router.post('/', ctrlContacts.createContact)

router.delete("/:contactId", ctrlContacts.removeContact);

router.put("/:contactId", ctrlContacts.updateContact)

router.patch('/:contactId/favorite', ctrlContacts.updateFavorite)

module.exports = router;