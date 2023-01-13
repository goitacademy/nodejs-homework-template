const express = require('express');

const {
  addContactValidation,
} = require('../../middlewares/validationMiddleware');

const {
  getListController,
  getByIdController,
  addController,
  deleteController,
  updateController,
} = require('../../controllers/contactsController');

const router = express.Router();

router.get('/', getListController);

router.get('/:contactId', getByIdController);

router.post('/', addContactValidation, addController);

router.put('/:contactId', addContactValidation, updateController);

router.delete('/:contactId', deleteController);

module.exports = router;
