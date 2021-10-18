const express = require('express')
const { joiSchema, updateFavoriteJoiSchema } = require('../../model/contacts')
const controllerWrapper = require('../../middlewares/ctrl')
const validation = require('../../middlewares/validation')
const {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
  updateStatusContact
} = require('../../controllers/index')
const router = express.Router()

router.get('/', controllerWrapper(listContacts))

router.get('/:id', controllerWrapper(getContactById))

router.post('/', validation(joiSchema), controllerWrapper(addContact))

router.put('/:id', validation(joiSchema), controllerWrapper(updateContactById))

router.patch('/:id/favorite', validation(updateFavoriteJoiSchema), controllerWrapper(updateStatusContact))

router.delete('/:id', controllerWrapper(removeContact))

module.exports = router
