const express = require('express');

const router = express.Router();

const contactsController = require('../../controllers/contacts-controller');

const { schemas } = require('../../models/contact');

const { validateBody, isValidId } = require('../../decorators');

router.get('/', contactsController.getAllContacts);

router.get('/:id', isValidId, contactsController.getContactById);

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact);

router.delete('/:id', isValidId, contactsController.removeContactById);

router.put('/:id', isValidId, contactsController.updateContactById);

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), contactsController.updateStatusContact)

module.exports = router
