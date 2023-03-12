const express = require('express')
const { getAll, getById, deleteById, addNewContact, updateContactInList } = require("../../controllers");
const { addValidation } = require('../../middlewares/validation');
// const { wrapper } = require('../../middlewares');

const router = express.Router()

router.get('/', getAll);

router.get('/:contactId', getById)

router.post('/', addValidation, addNewContact)

router.delete('/:contactId', deleteById)

router.put('/:contactId', addValidation, updateContactInList)

module.exports = router
