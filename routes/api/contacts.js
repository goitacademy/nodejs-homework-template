const express = require('express');
const router = express.Router();

const validate = require('./validation');
const contactsController = require('../../controllers/contactsController');

router
    .get('/', contactsController.getAllContacts)
    .post('/', validate.createContact, contactsController.createContact);

router
    .get('/:id', contactsController.getContactById)
    .delete('/:id', contactsController.removeContact)
    .patch(
        '/:id',
        validate.updateContactField,
        contactsController.updateContact,
    );
module.exports = router;
