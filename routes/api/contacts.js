const express = require('express');
const contactsRouter = express.Router();

const ctrl = require('../../controllers/contacts');
const {ctrlWrapper} = require('../../helpers');

const {validateBody, authenticate} = require('../../middlewars');
const {schemas} = require('../../models/contact');

contactsRouter.get('/', authenticate, ctrlWrapper(ctrl.listContacts));

contactsRouter.get('/:contactId', authenticate, ctrlWrapper(ctrl.getContactById));

contactsRouter.post('/', authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

contactsRouter.delete('/:contactId', authenticate, ctrlWrapper(ctrl.removeContact));

contactsRouter.put('/:contactId', authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact));

contactsRouter.patch('/:contactId/favorite', authenticate, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = contactsRouter;
