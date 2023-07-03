const express = require('express')
const { ctrlContacts } = require("../../controllers")
const { contactSchemas } = require("../../models")
const router = express.Router();
const {validateBody, isValidId, authenticate} = require("../../middlewares")

router.get('/',authenticate, ctrlContacts.getAll);

router.get('/:contactId',authenticate, isValidId, ctrlContacts.getById);

router.post('/', authenticate, validateBody(contactSchemas.addSchema), ctrlContacts.add);

router.delete('/:contactId', authenticate, isValidId, ctrlContacts.deleteById);

router.put('/:contactId', authenticate, isValidId, validateBody(contactSchemas.addSchema), ctrlContacts.updateById);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(contactSchemas.updateFavoriteSchema), ctrlContacts.updateFavorite);

module.exports = router;

 