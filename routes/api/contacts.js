const express = require('express');
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/contact');
const validateBody = require('../../middlewares');
const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:id', ctrlWrapper(ctrl.getById));
router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));
router.delete('/:id', ctrlWrapper(ctrl.removeById));
router.put('/:id', validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  '/:id/favorite',
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite),
);

module.exports = router;
