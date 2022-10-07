const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers')
const { validateBody, isValidId } = require("../../middlewares")
const { schemas } = require("../../models")


router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id',isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.addSchema),   ctrlWrapper(ctrl.add));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeById));

router.put('/:id', isValidId, ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));


module.exports = router;





