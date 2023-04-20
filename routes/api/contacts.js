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
const { validateBody, isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', getAll);

router.get('/:contactId', isValidId, getById);

router.post('/', isValidId, validateBody(schemas.addSchema), add);

router.delete('/:contactId', isValidId, deleteContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), update);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
