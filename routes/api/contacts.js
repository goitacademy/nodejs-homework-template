const express = require('express')
const {ctrlWrapper} = require('../../helpers/ctrlWrapper')
const {contacts: ctrl} = require("../../controllers/")

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrlWrapper(ctrl.getById))

router.post('/', ctrlWrapper(ctrl.add))

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact))

router.put('/:contactId', ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId', ctrlWrapper(ctrl.updateFavourite))

module.exports = router
