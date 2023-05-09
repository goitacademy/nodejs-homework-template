const express = require('express');
const contactsControllers = require('../../controllers/contacts-controllers');
const { schemas } = require('../../models/contact');
const { isValidId } = require('../../middlewares');
const { validateBody } = require('../../utils');

const router = express.Router();

router.get('/', contactsControllers.getAllContacts);

router.get('/:id', isValidId, contactsControllers.getContactById);

router.post('/', validateBody(schemas.contactAddSchema), contactsControllers.addContact);

router.put('/:id', isValidId, validateBody(schemas.contactAddSchema), contactsControllers.updateContactById);

router.patch('/:id/favorite', isValidId, validateBody(schemas.contactUpdateFavoriteSchema), contactsControllers.updateContactFavorite);

router.delete('/:id', isValidId, contactsControllers.deleteContactById);

module.exports = router;
