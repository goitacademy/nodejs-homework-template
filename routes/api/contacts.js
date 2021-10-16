const express = require('express')
const router = express.Router()

const { contactSchema } = require('../../schemas/contacts')
const controllerWrapper = require('../../middlewares/ctrl')
const validation = require('../../middlewares/validation')
const {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact
} = require('../../controllers/contacts')

console.log(contactSchema)

router.get('/', controllerWrapper(listContacts))

router.get('/:id', controllerWrapper(getContactById))

router.post('/', validation(contactSchema), controllerWrapper(addContact))

router.put('/:id', validation(contactSchema), controllerWrapper(updateContactById))

router.delete('/:id', controllerWrapper(removeContact))

module.exports = router
