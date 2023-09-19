const express = require('express')
const router = express.Router()

const ctrl = require("../../controllers")

const { validateBody, isValidId } = require("../../middlewares")
const { contactsSchema, addSchemaFavorite } = require("../../schemas")

router.get('/', ctrl.getAllCtrl)

router.get('/:contactId', isValidId, ctrl.getContactIdCtrl)

router.post('/', validateBody(contactsSchema), ctrl.postContactCtrl)

router.put('/:contactId', isValidId, validateBody(contactsSchema), ctrl.updateContactCtrl)

router.patch('/:contactId/favorite', isValidId, validateBody(addSchemaFavorite), ctrl.updateFavoriteCtrl)

router.delete('/:contactId', isValidId, ctrl.deleteContactCtrl)

module.exports = router
