const express = require("express");
const router = express.Router();
const ctrlContact = require('../../controllers/controller')

router.get("/", ctrlContact.get);

router.get('/:contactId', ctrlContact.getById);

router.post('/', ctrlContact.createContact)

router.delete("/:contactId", ctrlContact.removeContact)

router.put("/:contactId", ctrlContact.updateContact)

router.patch('/:contactId/favorite', ctrlContact.updateFavorite)

module.exports = router;