const express = require('express');
const { validateBody } = require('../../middlewares');
const ctrl = require('../../controllers/contacts');
const { isValidId } = require('../../middlewares');
const { newContSchema, updateFaviriteChema } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.getList);

router.get('/:contactId', ctrl.getById);

router.post('/', isValidId, validateBody(newContSchema), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.del);

router.put('/:contactId', isValidId, validateBody(newContSchema), ctrl.update);

router.patch('/:contactId/favorite', isValidId, validateBody(updateFaviriteChema), ctrl.updateFavorite);

module.exports = router;
