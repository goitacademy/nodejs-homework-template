const express = require('express');
const router = express.Router();

const contactsOperation = require('../../model/contacts/');
const contactsCtrl = require('../../controllers/contacts');

// возвращает массив всех контактов в json-формате со статусом 200
router.get('/', contactsCtrl.getAllContacts);

// если такой id есть, возвращает обьект контакта в json-формате со статусом 200
// если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
router.get('/:contactId', contactsCtrl.getContactById);

// По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201
router.post('/', contactsCtrl.addContact);

// если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
// если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
router.delete('/:contactId', contactsCtrl.removeContactById);

// По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
router.put('/:contactId', contactsCtrl.updateContactById);

module.exports = router;
