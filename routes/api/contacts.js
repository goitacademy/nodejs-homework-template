const express = require('express');

const {
  validateBody,
  isValidId,
  validateFavorite,
} = require('../../middlewars');
const { schemas } = require('../../models/contact');
const controlers = require('../../controllers/contacts');

const router = express.Router();

router.get('/', controlers.getAll);

router.get('/:id', isValidId, controlers.getById);

router.post('/', validateBody(schemas.addShema), controlers.add);

router.put(
  '/:id',
  isValidId,
  validateBody(schemas.addShema),
  controlers.updateById
);

router.patch(
  '/:id/favorite',
  isValidId,
  validateFavorite(schemas.addFavoriteShema),
  controlers.updateStatusContact
);

router.delete('/:id', isValidId, controlers.deleteById);

module.exports = router;
