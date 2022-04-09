const express = require('express')
const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact} = require('../../controllers/')
const { schemaCreateContact, schemaFavoriteContact,schemaMongoId } = require('./contacts-validation-schemes')
const { validateBody, validateParams } = require('../../middlewares/validation')
const router = express.Router()

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/',validateBody(schemaCreateContact), addContact)
router.delete('/:contactId', removeContact)
router.put('/:contactId',validateBody(schemaCreateContact), updateContact)

router.patch(
  '/:contactId/favorite',
  [validateParams(schemaMongoId), validateBody(schemaFavoriteContact)],
  updateContact,
)

module.exports = router
