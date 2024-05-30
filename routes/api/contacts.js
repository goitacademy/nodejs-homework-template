const express = require('express');
const {
  getAll,
  getById,
  add,
  deleteContact,
  updateFavorite,
  update,
} = require('../../controllers/contacts');

const { schemas } = require('../..//models/contact');
const { validateBody, isValidId, authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, getAll);

router.get('/:contactId', authenticate, isValidId, getById);

router.post('/', authenticate, validateBody(schemas.addSchema), add);

router.delete('/:contactId', authenticate, isValidId, deleteContact);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  update
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
