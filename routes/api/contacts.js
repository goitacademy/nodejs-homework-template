const express = require('express');
const ctrl = require('../../controllers/contacts');
const ctrlWrapper = require('../../helpers/ctrWrapper');
const { validateBody, isValidId, validateFavorite, authenticate } = require('../../middlewares');
const { addSchema, updateFavoriteSchema } = require('../../schemas')


const router = express.Router()

router.get('/', authenticate, ctrlWrapper(ctrl.getList));

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validateBody(addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.remove));

router.patch('/:contactId/favorite', authenticate, isValidId, validateFavorite(updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.put('/:contactId', authenticate, isValidId, validateBody(addSchema), ctrlWrapper(ctrl.update));

module.exports = router
