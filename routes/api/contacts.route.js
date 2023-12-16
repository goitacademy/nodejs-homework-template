import express from 'express';
import auth from '../helpers/user.auth.js';
import {
  getUserContactsList,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  removeContact,
} from '../controller/contacts.controller.js';

const contactsRouter = express.Router();

contactsRouter.get('/', auth, getUserContactsList);

contactsRouter.get('/:id', auth, getContactById);

contactsRouter.post('/', auth, createContact);

contactsRouter.put('/:id', auth, updateContact);

contactsRouter.patch('/:id/favorite', auth, updateStatusContact);

contactsRouter.delete('/:id', auth, removeContact);

export default contactsRouter;
