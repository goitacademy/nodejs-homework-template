const express = require('express');

const router = express.Router();

const { validateBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/contacts');

const ctrl = require('../../controllers/contacts');

router.get('/', ctrl.getAll);

router.get('/:contactId', isVlidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema) ,ctrl.add);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

router.delete('/:contactId', isValidId, ctrl.remove);

module.exports = router