const express = require('express');


const ctrlConstants = require("../../controllers/ContactsControllers")
const { addValidationContacts, validateToggleFavorite } = require("../../middleware/validationContactSchemaJoi");

const router = express.Router();

router.get('/', ctrlConstants.getAll);

router.get('/:contactId', ctrlConstants.getById);

router.post('/', addValidationContacts, ctrlConstants.createContacts);

router.delete('/:contactId', ctrlConstants.deleteContacts);

router.put('/:contactId', addValidationContacts, ctrlConstants.updateContact);

router.patch('/:contactId/favorite', validateToggleFavorite, ctrlConstants.updateStatusContact);

module.exports = router;

