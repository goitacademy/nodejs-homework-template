const express = require('express');
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', ctrlWrapper(ctrl.updateContact));

module.exports = router;
