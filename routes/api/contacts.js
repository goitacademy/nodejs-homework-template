import * as api from '../../models/contacts.js';
import * as contactsController from '../../controllers/contactsController.js';
import express from 'express';

export const router = express.Router();

// GET
// получение списка всех контактов
router.get('/', contactsController.listContacts);

// GET id
// получение контакта с заднным id
router.get('/:id', contactsController.getContactById);

// DELETE id
// удаление контакта с заданным id
router.delete('/:id', contactsController.removeContact);

// POST
// добавление нового контакта
router.post('/', contactsController.addContact);

// PUT id
// изменение контакта с заданным id
router.put('/:id', contactsController.updateContact);
