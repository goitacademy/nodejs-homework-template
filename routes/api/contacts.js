const express = require('express')
const router = express.Router()

const { controllerWrapper, validation } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')

const {
  getContacts,
  getById,
  addContact,
  updateById,
  deleteById,
} = require('../../controllers')

router.get('/', controllerWrapper(getContacts))

router.get('/:contactId', controllerWrapper(getById))

router.post('/', validation(joiSchema), controllerWrapper(addContact))

router.patch(
  '/:contactId/favorite',
  validation(joiSchema),
  controllerWrapper(updateById)
)

router.delete('/:contactId', controllerWrapper(deleteById))

module.exports = router
