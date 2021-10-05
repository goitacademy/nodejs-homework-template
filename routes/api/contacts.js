const express = require('express')

const { contacts: ctrl } = require('../../controllers')

const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middelwares')
const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))

// router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post(
  '/',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.addContact),
)

// router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

// router.put(
//   '/:contactId',
//   validation(joiSchema),
//   controllerWrapper(ctrl.updateById),
// )

// router.patch(
//   '/:contactId/favorite',
//   validation(updateFavoriteJoiSchema),
//   controllerWrapper(ctrl.updateFavorite),
// )

module.exports = router
