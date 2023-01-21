const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const {
  getAll,
  getById,
  add,
  updateById,
  updateFavorite,
  deleteById,
} = require('../../controllers/contactsController');

const router = express.Router();

router.get('/', authenticate, getAll);

router.get('/:contactId', authenticate, getById);

router.post('/', authenticate, validateBody(schemas.addSchema), add);

router.put(
  '/:contactId',
  authenticate,
  validateBody(schemas.addSchema),
  updateById
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

router.delete('/:contactId', authenticate, deleteById);

module.exports = router;
