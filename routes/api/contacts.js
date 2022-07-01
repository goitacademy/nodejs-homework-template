const express = require('express')
const {validation, ctrlWrapper} = require('../../middleware')

const {joiSchema} = require('../../models/contact')

const {contacts: ctrl} = require("../../controllers")

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:id', ctrlWrapper(ctrl.getById))

router.post('/', validation(joiSchema.add) , ctrlWrapper(ctrl.add))

router.delete('/:id', ctrlWrapper(ctrl.deleteContact))

router.put('/:id', validation(joiSchema.add), ctrlWrapper(ctrl.updateContact))

router.patch('/:id/favorite', validation(joiSchema.updateFavorite) , ctrlWrapper(ctrl.updateFavorite))

module.exports = router
