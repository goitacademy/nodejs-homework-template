const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers')
const { JoiContactSchema } = require('../../model')
const { validation, tryCatchWrapper, authenticate } = require('../../middlewares')

const validationContactMiddleware = validation(JoiContactSchema)

router.get('/', tryCatchWrapper(authenticate), tryCatchWrapper(ctrl.listContacts))

router.get('/:contactId', tryCatchWrapper(authenticate), tryCatchWrapper(ctrl.getContactById))

router.post('/',
  tryCatchWrapper(authenticate),
  validationContactMiddleware,
  tryCatchWrapper(ctrl.addContact
  ))

router.delete('/:contactId', tryCatchWrapper(authenticate), tryCatchWrapper(ctrl.removeContact))

router.put(
  '/:contactId',
  tryCatchWrapper(authenticate),
  validationContactMiddleware,
  tryCatchWrapper(ctrl.updateContact)
)

router.patch('/:contactId/favorite',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(ctrl.updateFavorite)
)

module.exports = router
