const express = require('express')
const router = express.Router()

const {
  getAllContacts,
  getContById,
  deleteContactById,
  addNewContact,
  contactUpdate,
} = require('../../controllers')

const { validation } = require('../../middlewares')
const { joiSchema, joiSchemaUpdate } = require('../../validations')

router.get('/', getAllContacts)

router.get('/:contactId', getContById)

router.post('/', validation(joiSchema), addNewContact)

router.delete('/:contactId', deleteContactById)

router.put('/:contactId', validation(joiSchemaUpdate), contactUpdate)

module.exports = router
