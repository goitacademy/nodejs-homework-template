const express = require('express');

const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../decorators');
const { isValidId } = require('../../middlewares');

const schemas = require('../../schemas/contacts');

const addContactValidate = validateBody(schemas.contactAddSchema);

const updateContactFavoriteValidate = validateBody(schemas.contactUpdateFavoriteSchema);

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', addContactValidate, ctrl.add);

router.put('/:id', isValidId, addContactValidate, ctrl.updateById);

router.patch('/:id/favorite', isValidId, updateContactFavoriteValidate, ctrl.updateStatusContact);

router.delete('/:id', isValidId, ctrl.deleteById);

module.exports = router;
