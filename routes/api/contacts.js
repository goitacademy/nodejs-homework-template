const express = require('express')

const ctrl = require('../../controllers/contacts')

const { ctrlWrapper } = require('../../helpers')

const { validationBody, authenticate } = require('../../middlewares')

const { schemas } = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, ctrlWrapper(ctrl.listContacts))

router.get('/:id', authenticate, ctrlWrapper(ctrl.getContactById))

router.post(
  '/',
  authenticate,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact),
)

router.put(
  '/:id',
  authenticate,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactById),
)

router.patch(
  '/:id/favorite',
  authenticate,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavotite),
)

router.delete('/:id', authenticate, ctrlWrapper(ctrl.removeContact))

module.exports = router
