const express = require('express')
const {ctrlWrapper} = require('../../helpers/ctrlWrapper')
const {validation} = require('../../middlewares')

const {joiSchema} = require('../../models/contact')

const {contacts: ctrl} = require("../../controllers")

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:id', ctrlWrapper(ctrl.getById))

router.post('/', ctrlWrapper(ctrl.add))

router.delete('/:id', ctrlWrapper(ctrl.deleteContact))

router.put('/:id', ctrlWrapper(ctrl.updateContact))

router.patch('/:id/favorite', ctrlWrapper(ctrl.updateFavourite))

module.exports = router
