const express = require('express');

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/contacts`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth } = require(`${basedir}/middlewares`);

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAllContacts));

router.get('/:id', auth, ctrlWrapper(ctrl.getContactById));

router.post('/', auth, ctrlWrapper(ctrl.addContact));

router.delete('/:id', auth, ctrlWrapper(ctrl.removeContact));

router.put('/:id', auth, ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', auth, ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
