const express = require('express');
const router = express.Router();
const ContactsController = require('../../controllers/contacts.controller');
const {validationCreate, validationUpdate} = require('../../validations/contacts.schema');

router.get('/', ContactsController.getAll);
router.get('/:contactId', ContactsController.getById);
router.post('/', validationCreate, ContactsController.create);
router.delete('/:contactId', ContactsController.remove);
router.patch('/:contactId', validationUpdate, ContactsController.update);

module.exports = router
