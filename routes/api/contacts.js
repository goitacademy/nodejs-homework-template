const express = require('express');

const router = express.Router();

const { validateBody, isValidId } = require('../../middlewares');

const { schema } = require('../../models/contact');

const ctrl = require('../../controllers/contacts');

router.get('/', ctrl.getContacts);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', validateBody(schema.addSchema), ctrl.add);

router.delete('/:id', isValidId, ctrl.deleteByID);

router.put('/:id', isValidId, validateBody(schema.updateSchema), ctrl.updateById);

router.patch('/:id/favorite', isValidId, validateBody(schema.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router

