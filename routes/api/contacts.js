const express = require('express')
const {validation, ctrlWrapper} = require('../../middlewares')
const ctrl = require("../../controllers/contacts")
const {joiSchema, favoriteJoiSchema} = require('../../models/contact')
const router = express.Router()





router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrlWrapper(ctrl.getById))

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.add))

router.delete('/:contactId', ctrlWrapper(ctrl.deleteById))

router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFav))

module.exports = router
