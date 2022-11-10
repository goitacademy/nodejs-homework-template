const express = require('express');
const ctrl = require('../../controllers')
const router = express.Router();
const { ctrlWrapper } = require("../../helpers")
const { validateBody, isValidId }  = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.addSchema),  ctrlWrapper(ctrl.add));

router.delete('/:contactId', isValidId,  ctrlWrapper(ctrl.removeById));
router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));
router.patch('/:contactId/favorite', isValidId, validateBody(schemas.checkFavoriteSchema), ctrlWrapper(ctrl.checkFavoriteSchema));

module.exports = router
