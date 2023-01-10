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

const { validateBody, authenticate, validateId } = require('../../middlewares');

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, getAllContacts);

contactsRouter.get('/:id', authenticate, validateId, getContactById);

contactsRouter.post(
  '/',
  authenticate,
  validateBody(contactSchemas.addContactSchema),
  addContact
);

contactsRouter.delete('/:id', authenticate, validateId, deleteContact);

contactsRouter.put(
  '/:id',
  authenticate,
  validateBody(contactSchemas.updateContactSchema),
  validateId,
  updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  validateBody(contactSchemas.updateFavoriteSchema),
  validateId,
  updateContactFavorite
);

module.exports = contactsRouter;
