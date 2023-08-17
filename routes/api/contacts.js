const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/contacts');

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schemas.schemaPut), ctrl.addContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContact);

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.schemaPut), ctrl.updateContact);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.schemaUpdateFavorite), ctrl.updateStatusContact);

module.exports = router;
