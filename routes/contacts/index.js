const express = require('express')
const router = express.Router()
const {
  getAll,
  getById,
  createContact,
  removeContact,
  updateStatusContact,
  updateContact,
} = require('../../controllers/contacts')
const { ValidCreateContact,
  ValidUpdateStatus,
  ValidQueryContact,
        ValidUpdateAllContact } = require('./validContactsRoute.js')

const guard = require('../../helper/guard')

router
  .get('/', guard, ValidQueryContact, getAll)
  .post('/', guard, ValidCreateContact, createContact)

router
  .get('/:id', guard, getById)
  .delete('/:id', guard, removeContact)
  .put('/:id', guard,  ValidUpdateAllContact, updateContact)


router.patch('/:id/favorite', guard, ValidUpdateStatus, updateStatusContact )

 module.exports = router
