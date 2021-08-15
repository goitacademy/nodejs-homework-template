const express = require('express')
const { getAll, getById, create, update, remove } = require('../../controllers/controllers-contacts')
const { validation, patchValidation } = require('../../validation/validation')
const router = express.Router()

router
  .get('/', getAll)
  .get('/:contactId', getById)
  .post('/', validation, create)
  .delete('/:contactId', remove)
  .put('/:contactId', validation, update)
  .put('/:contactId/favorite', patchValidation, update)

module.exports = router
