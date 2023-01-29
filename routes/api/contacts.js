const express = require('express');

const ctrlConstants = require("../../controllers/ContactsControllers")
const { addValidationContacts, addValidationFavorite } = require("../../middleware/validationContactSchemaJoi");

const router = express.Router();

router.get('/', ctrlConstants.getAll);

router.get('/:contactId', ctrlConstants.getById);

router.post('/', addValidationContacts, ctrlConstants.createContacts);

router.delete('/:contactId', ctrlConstants.deleteContacts);

router.put('/:contactId', addValidationContacts, ctrlConstants.updateContact);

router.patch('/:contactId/favorite', addValidationFavorite, ctrlConstants.getById);

module.exports = router;

