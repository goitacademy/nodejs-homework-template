const express = require('express');

const {
  validateBody,
  isValidId,
  validateFavorite,
  authenticate,
} = require('../../middlewars');
const { schemas } = require('../../models/contact');

const controlers = require('../../controllers/contacts');

const router = express.Router();

router.get('/', authenticate, controlers.getAll);

router.get('/:id', authenticate, isValidId, controlers.getById);

router.post('/', authenticate, validateBody(schemas.addShema), controlers.add);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addShema),
  controlers.updateById
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateFavorite(schemas.addFavoriteShema),
  controlers.updateStatusContact
);

router.delete('/:id', authenticate, isValidId, controlers.deleteById);

module.exports = router;
