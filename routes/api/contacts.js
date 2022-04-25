const express = require('express')

const router = express.Router()
const  validation = require('../../middlewares/validation');
const ctrlWrapper = require('../../middlewares/ctrlWrapper')

const controller = require('../../controlers/controllers')
const { joiSchema , favoriteJoiSchema} = require('../../models/schema')

router.get('/', ctrlWrapper(controller.listContacts))

router.get('/:contactId', ctrlWrapper(controller.getContactById))

router.post('/', validation(joiSchema), ctrlWrapper(controller.addContact))

router.delete('/:contactId', ctrlWrapper(controller.removeContact))

router.put('/:contactId',validation(joiSchema), ctrlWrapper(controller.updateContact))

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(controller.updateFavoriteContact))

module.exports = router
