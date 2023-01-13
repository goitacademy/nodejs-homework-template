const express = require('express')

const router = express.Router();
const {validation, ctrlWrapper} = require("../../middlewares/index")

const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers")

router.get('/', ctrlWrapper(ctrl.getAllContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavoriteStatus))

module.exports = router
