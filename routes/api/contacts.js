const express = require('express');
const router = express.Router();
const ContactsController = require('../../controllers/contacts.controller');

router.get('/', ContactsController.getAll);
router.get('/:contactId', ContactsController.getById);
router.post('/', ContactsController.create);
router.delete('/:contactId', ContactsController.remove);
router.patch('/:contactId', ContactsController.update);

module.exports = router
