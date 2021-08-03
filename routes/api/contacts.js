const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');

router.get('/', ctrl.getAll);
router.get('/:contactId', ctrl.getContactById);
router.post('/', ctrl.addContact);
router.delete('/:contactId', ctrl.removeContact);
router.patch('/:contactId', ctrl.updateContact);

router.patch('/:contactId/favorite', ctrl.updateContactStatus);

module.exports = router;
