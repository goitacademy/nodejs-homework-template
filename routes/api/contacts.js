const express = require("express");
const ctrlContacts = require("../../controllers/contacts");
const authorization = require("../../auth/authorization")
const router = express.Router();


router.get("/",authorization, ctrlContacts.get);

router.get('/:contactId', authorization,ctrlContacts.getById);

router.post('/', authorization, ctrlContacts.createContact);

router.delete("/:contactId",authorization, ctrlContacts.removeContact);

router.put("/:contactId",authorization, ctrlContacts.updateContact)

router.patch('/:contactId/favorite',authorization, ctrlContacts.updateFavorite)

module.exports = router;