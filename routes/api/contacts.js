const express = require('express')
const { auth, validation, ctrlWrapper } = require('../../middlewares')
const { joiSchema, favoriteJoiSchema } = require('../../models/contact')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')

router.get('/', auth, ctrlWrapper(ctrl.getAll))

router.get('/:id', ctrlWrapper(ctrl.getById))

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.add))

router.put('/:id', validation(joiSchema), ctrlWrapper(ctrl.updateById))

router.delete('/:id', ctrlWrapper(ctrl.removeById))

router.patch('/:id/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router
