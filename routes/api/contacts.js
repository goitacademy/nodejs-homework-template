const express = require("express");
const router = express.Router();

const validation = require("../../helpers/validation");
const controllers = require("../../controllers/controllers");

router.get('/', controllers.getContacts)
router.get('/:contactId', controllers.getContactId)
router.post('/', validation.validateAddContact, controllers.addContact)
router.delete('/:contactId', controllers.deieteContactId)
router.put('/:contactId', validation.validatePutContact, controllers.putContactId)

module.exports = router;
