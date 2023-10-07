const express = require('express');
const controllers = require('../../controllers/contacts-controller');
const {contactAddSchema, contactUpdateFavoriteSchema} = require('../../schemas/contact-schemas');
const { isEmptyBody, isValidId } = require('../../middlewares');
const { validateBody } = require('../../decorators');

const contactsRouter = express.Router();

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

contactsRouter.get('/', controllers.getAllContacts);

contactsRouter.get('/:id', isValidId, controllers.getContactById);

contactsRouter.post('/', isEmptyBody, contactAddValidate, controllers.addContact);

contactsRouter.put('/:id', isValidId, isEmptyBody, contactAddValidate, controllers.updateContact);

contactsRouter.patch('/:id/favorite', isValidId, isEmptyBody, contactUpdateFavoriteValidate, controllers.updateContact);

contactsRouter.delete('/:id', isValidId, controllers.removeContact);

module.exports = contactsRouter;
