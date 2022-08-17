const express = require('express');

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/contacts`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth } = require(`${basedir}/middlewares`);

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAllContacts)); // роут для списку всіх контактів

router.get('/:id', auth, ctrlWrapper(ctrl.getContactById)); // роут для контакту з id

router.post('/', auth, ctrlWrapper(ctrl.addContact)); // роут для створення контакту

router.delete('/:id', auth, ctrlWrapper(ctrl.removeContact)); // роут для видалення контакту

router.put('/:id', auth, ctrlWrapper(ctrl.updateContact)); // роут для оновлення контакту

router.patch('/:id/favorite', auth, ctrlWrapper(ctrl.updateStatusContact)); // роут для статусу, favorite

module.exports = router;
