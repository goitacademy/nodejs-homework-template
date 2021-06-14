const express = require('express')
const router = express.Router()
const {
  getAll,
  getById,
  create,
  remove,
  update
} = require('../../controllers/contacts')

router.get('/', getAll)

router.get('/:contactId', getById)

router.post('/', create)

router.delete('/:contactId', remove)

router.put('/:contactId', update)

router.patch('/:contactId', update)

module.exports = router
