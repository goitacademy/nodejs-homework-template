const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const ctrl = require('../../controllers/contacts');
const { isValidId } = require('../../middlewares');
const { newContSchema, updateFaviriteChema } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrl.getList);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(newContSchema), ctrl.add);

router.delete('/:contactId', authenticate, isValidId, ctrl.del);

router.put('/:contactId', authenticate, isValidId, validateBody(newContSchema), ctrl.update);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(updateFaviriteChema), ctrl.updateFavorite);

module.exports = router;
