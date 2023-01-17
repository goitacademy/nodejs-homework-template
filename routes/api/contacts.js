const express = require('express');

const {
  addContactValidation,
} = require('../../middlewares/validationMiddleware');

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

router.post('/', addContactValidation, add);

router.put('/:contactId', addContactValidation, updateById);

router.patch('/:contactId/favorite', updateFavorite);

router.delete('/:contactId', deleteById);

module.exports = router;
