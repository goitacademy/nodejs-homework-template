const express = require('express');
const ctrl = require('../../controllers')
const router = express.Router();
const { ctrlWrapper } = require("../../helpers")
const { validateBody, isValidId, authenticate }  = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get('/',authenticate,  ctrlWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post('/',authenticate, validateBody(schemas.addSchema),  ctrlWrapper(ctrl.add));

router.delete('/:contactId',authenticate, isValidId,  ctrlWrapper(ctrl.removeById));
router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));
router.patch('/:contactId/favorite',authenticate,  isValidId, validateBody(schemas.checkFavoriteSchema), ctrlWrapper(ctrl.checkFavoriteSchema));

module.exports = router
