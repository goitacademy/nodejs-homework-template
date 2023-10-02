const express = require('express');
const controllers = require('../../controllers/contacts-controller');
const contactAddSchema = require('../../schemas/contact-schemas');
const { isEmptyBody } = require('../../middlewares');
const { validateBody } = require('../../decorators');

const contactsRouter = express.Router();

const contactAddValidate = validateBody(contactAddSchema);

contactsRouter.get('/', controllers.getAllContacts);

contactsRouter.get('/:id', controllers.getContactById);

contactsRouter.post('/', isEmptyBody, contactAddValidate, controllers.addContact);

contactsRouter.put('/:id', isEmptyBody, contactAddValidate, controllers.updateContact);

contactsRouter.delete('/:id', controllers.removeContact);

module.exports = contactsRouter;
