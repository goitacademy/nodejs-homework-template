const express = require('express');
const ctrl = require('../../controllers/contacts');
const ctrlWrapper = require('../../helpers/ctrWrapper');
const { validateBody, isValidId, validateFavorite } = require('../../middlewares');
const { addSchema, updateFavoriteSchema } = require('../../schemas')


const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getList));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validateBody(addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.remove));

router.patch('/:contactId/favorite', isValidId, validateFavorite(updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.put('/:contactId', isValidId, validateBody(addSchema), ctrlWrapper(ctrl.update));

module.exports = router
