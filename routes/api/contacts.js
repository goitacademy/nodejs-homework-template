const express = require('express')
const {
  getListContactsController,
  getContactByIdController,
  deleteContactController,
  createNewContactController,
  updateContactController,
} = require("../../controllers/contactsControllers");
const { validateRequestBody } = require("../../middlewares");
const {
  contactSchema,
} = require("../../schemas/contactSchema.js");

const router = express.Router()

router.get('/', getListContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', validateRequestBody(contactSchema), createNewContactController)

router.delete('/:contactId', deleteContactController)

router.put('/:contactId', validateRequestBody(contactSchema), updateContactController)

module.exports = router
