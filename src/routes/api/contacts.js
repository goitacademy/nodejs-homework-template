
const express = require('express');
const router = express.Router();

// const {joyValidation} = require('../../middleware');
// const {contactSchema} = require ('../../schemas');
// const joyValidate = joyValidation(contactSchema);
const {schemas} = require('../../models/contacts')

const {
  // getAll,
  // getById,
  addById,
  // deleteById,
  // updateById,
} = require("../../controllers/index");

// router.get('/', getAll);
// router.get('/:contactId', getById);
router.post('/', schemas.addSchema, addById);
// router.delete('/:contactId', deleteById);
// router.put('/:contactId', schemas.addSchema, updateById);

module.exports = router;
