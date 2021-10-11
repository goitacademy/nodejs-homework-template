const express = require('express')
const router = express.Router()

const { validation } = require('../../middlewares')
const {
  joiContactSchema,
  updateContactStatusSchema,
} = require('../../model/contacts')
const ctrl = require('../../controllers')

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validation(joiContactSchema), ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validation(joiContactSchema), ctrl.updateContact)

router.patch(
  '/:contactId/favorite',
  validation(updateContactStatusSchema),
  ctrl.updateContactStatus
)

module.exports = router
