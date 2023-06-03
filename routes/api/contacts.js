const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require('../../middlewares');

const { schemas } = require("../../models/contacts");

router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.contactsAddSchema), ctrl.add);

router.delete('/:id', isValidId, ctrl.deleteById );

router.put('/:id', isValidId, validateBody(schemas.contactsAddSchema), ctrl.updateById);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteShema),
  ctrl.updateFavorite
);

module.exports = router;
