const express = require('express')

const ctrl = require('../../controllers/contacts')

const { ctrlWrapper } = require('../../helpers')

const { validationBody } = require('../../middlewares')

const schemas = require('../../schemas/contact')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post(
  '/',
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact),
)

router.put(
  '/:id',
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactById),
)

router.delete('/:id', ctrlWrapper(ctrl.removeContact))

module.exports = router
