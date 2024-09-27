const express = require('express')
const router = express.Router()

const { putContactsValidation, postContactsValidation } = require('../../middlewares/validationMiddlver');

const {
  getContacts,
  getIdContacts,
  putContacts,
  postContacts,
  deleteContacts}=require("../../controllers/contactsControllers")

router.get('/', getContacts )

router.get('/:contactId', getIdContacts)

router.post('/', postContactsValidation, postContacts)

router.delete('/:contactId', deleteContacts)

router.put('/:contactId', putContactsValidation, putContacts )

module.exports = router
