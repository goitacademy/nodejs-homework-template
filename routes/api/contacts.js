const express = require('express');

const {getAll, getById, addContact, removeContact, updateContact, updateFavorite} = require("../../controllers/contacts");

const { validateBody, authenticate, isValidId}  = require("../../middlewares");

const schemas = require("../../schemas/contacts");


const router = express.Router();

router.use(authenticate);

router.get('/', getAll);

router.get('/:contactId', isValidId, getById);

router.post('/', validateBody(schemas.addSchema), addContact);

router.delete('/:contactId', isValidId, removeContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), updateContact);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.ContactUpdateFavoriteShema), updateFavorite);

module.exports = router;