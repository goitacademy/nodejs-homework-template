const express = require('express');
const {validation, ctrlWrapper} = require("../../middlewares")
const {joiSchema} = require("../../models/contatc")
const {favoriteJoiSchema} = require("../../models/contatc")
const router = express.Router()


const {contacts: ctrl} = require("../../controllers/index.js")

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrlWrapper(ctrl.getById))

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.addContacts) )

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact) )

router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.updateContact) )

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavorite) )

module.exports = router
