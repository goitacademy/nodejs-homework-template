const express = require('express');

const { validateBody } = require('../../middlewares');

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

router.get('/', getAll);

router.get('/:contactId', getById);

router.post('/', validateBody(schemas.addSchema), add);

router.put('/:contactId', validateBody(schemas.addSchema), updateById);

router.patch(
  '/:contactId/favorite',
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

router.delete('/:contactId', deleteById);

module.exports = router;
