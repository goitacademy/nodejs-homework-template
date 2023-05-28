const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const {validateBody, isValidId} = require('../../middlewares')
const schemas = require('../../models/contact');

router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.delete('/:contactId', isValidId, ctrl.deleteById);

router.patch('/:contactId/favorite', isValidId,validateBody(ctrl.updateFavorite), ctrl.updateFavorite)

module.exports = router;
