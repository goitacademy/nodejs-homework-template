const express = require('express');

const {
  getAll,
  getById,
  addById,
  deleteById,
  updateById,
} = require('../../controllers/contactsController');


const router = new express.Router();


const {contactValidation} = require('../../middlewares/validation');

router.get('/', getAll);

router.get('/:contactId', getById);

router.post('/', contactValidation, addById);

router.delete('/:contactId', deleteById);

router.put('/:contactId', contactValidation, updateById);

module.exports = router;
