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
        ValidUpdateAllContact } = require('./validContactsRoute.js')

router
  .get('/', getAll)
  .post('/', ValidCreateContact, createContact)



router
  .get('/:id', getById)
  .delete('/:id', removeContact)
  .put('/:id', ValidUpdateAllContact, updateContact)


router.patch('/:id/favorite', ValidUpdateStatus, updateStatusContact )


module.exports = router
