const express = require('express')
const router = express.Router()
const { postContactValidation, patchContactValidation } = require('../../middlewares/validationMiddleware')
const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  patchContact,
  putContact
} = require('../../controllers/contactController')

router.get('/', getContacts)

router.get('/:contactId', getContactById)

router.post('/', postContactValidation, postContact)

router.delete('/:contactId', deleteContact)

router.patch('/:contactId', patchContactValidation, patchContact)

router.put('/:contactId', postContactValidation, putContact)

module.exports = router
