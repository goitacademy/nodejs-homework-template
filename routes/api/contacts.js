const express = require('express');
const {
  addContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContact,
  updateContactFavorite,
} = require('../../controllers');

const { contactSchemas } = require('../../models');

const { validateBody, authenticate } = require('../../middlewares');

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, getAllContacts);

contactsRouter.get('/:id', authenticate, getContactById);

contactsRouter.post(
  '/',
  authenticate,
  validateBody(contactSchemas.addContactSchema),
  addContact
);

contactsRouter.delete('/:id', authenticate, deleteContact);

contactsRouter.put(
  '/:id',
  authenticate,
  validateBody(contactSchemas.updateContactSchema),
  updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  validateBody(contactSchemas.updateFavoriteSchema),
  updateContactFavorite
);

module.exports = contactsRouter;
