/* eslint-disable linebreak-style */
const express = require('express');
const {contactValidation} = require('../../middlewares/contactsValidation');

const ctrlContacts = require('../../controllers/contacts');

const router = new express.Router();

router.get('/', ctrlContacts.get);
router.get('/:contactId', ctrlContacts.getById);
router.post('/', contactValidation, ctrlContacts.add);
router.put('/:contactId', contactValidation, ctrlContacts.update);
router.patch('/:contactId/favorite', ctrlContacts.updateStatus);
router.delete('/:contactId', ctrlContacts.remove);

module.exports = router;
