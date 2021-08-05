const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId', authenticate, ctrl.getContactById);

router.post('/', express.json(), authenticate, ctrl.addContact);

router.delete('/:contactId', authenticate, ctrl.removeContact);

router.patch('/:contactId', authenticate, ctrl.updateContact);

router.patch('/:contactId/favorite', authenticate, ctrl.updateContactStatus);

module.exports = router;
