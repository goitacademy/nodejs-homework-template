const express = require('express')
const { ctrlWrapper, validation, auth } = require('../../middlewares')
const { joiContactSchema, statusSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', auth, ctrlWrapper(ctrl.allContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post(
  '/',
  auth,
  validation(joiContactSchema),
  ctrlWrapper(ctrl.addContact)
)

router.put(
  '/:id',
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateContactById)
)

router.delete('/:id', ctrlWrapper(ctrl.removeContact))

router.patch(
  '/:id/favorite',
  validation(statusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
)

module.exports = router
