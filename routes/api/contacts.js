const express = require('express');

const contactsController = require('../../controllers/contacts-controller.js');
const validateBody = require('../../decorators/validateBody.js');

const contactSchemas = require('../../models/Contact');

const { isValidId, authenticate } = require('../../middleware/index');

const contactAddValidate = validateBody(contactSchemas.contactAddSchema);

const contactUpdateFavoriteValidate = validateBody(contactSchemas.contactUpdateFavoriteSchema);

const router = express.Router();

router.use(authenticate);

router.get('/', contactsController.getAll);

router.get('/:contactId', isValidId, contactsController.getById);

router.post('/', contactAddValidate, contactsController.add);

router.put('/:contactId', isValidId, contactAddValidate, contactsController.updateById);

router.patch('/:contactId/favorite', isValidId, contactUpdateFavoriteValidate, contactsController.updateById);

router.delete('/:contactId', isValidId, contactsController.deleteById);


module.exports = router;
