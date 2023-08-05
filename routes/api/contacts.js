import express from 'express';
import * as api from '../../models/contacts.js';
import { contactsController } from '../../controllers/contactsController.js';

import {
  validateAddedBody,
  validateUpdatedBody,
} from '../../decorators/validateBody.js';

export const router = express.Router();

// GET: получение списка всех контактов
router.get('/', contactsController.listContacts);

// GET id: получение контакта с заднным id
router.get('/:id', contactsController.getContactById);

// POST: добавление нового контакта
router.post('/', validateAddedBody(), contactsController.addContact);

// DELETE id: удаление контакта с заданным id
router.delete('/:id', contactsController.removeContact);

// PUT id: изменение контакта с заданным id
router.put('/:id', validateUpdatedBody(), contactsController.updateContact);
