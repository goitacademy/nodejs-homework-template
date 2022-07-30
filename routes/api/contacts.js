const express = require('express')
const { basedir } = global;

const ctrl = require(`${basedir}/controllers/contacts`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAllContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', ctrlWrapper(ctrl.updateContactById));

router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;