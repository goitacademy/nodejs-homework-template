const express = require('express')
const { basedir } = global;

const { auth } = require(`${basedir}/middlewares`);

const ctrl = require(`${basedir}/controllers/contacts`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router()

router.get('/', auth, ctrlWrapper(ctrl.getAllContacts));

router.get('/:contactId', auth, ctrlWrapper(ctrl.getContactById));

router.post('/', auth, ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', auth, ctrlWrapper(ctrl.updateContactById));

router.patch('/:contactId/favorite', auth, ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;