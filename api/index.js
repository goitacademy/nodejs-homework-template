const express = require('express');
const router = express.Router();
const contactsController = require('../controller')

router.get('/', contactsController.listContacts);

router.get('/:contactId', contactsController.getContactById);

router.post('/', contactsController.addContact);

router.delete('/:contactId', contactsController.removeContact);

router.put('/:contactId', contactsController.updateContact);

router.patch('/:contactId/favorite', contactsController.updateStatusContact);

router.post('/users/signup', contactsController.userSignup);

router.post('users/login', contactsController.userLogin);

router.get('users/logout', contactsController.userLogout);

router.get('users/current', contactsController.userCurrent);

module.exports = router