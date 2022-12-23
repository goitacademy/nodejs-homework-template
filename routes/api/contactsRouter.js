const express = require('express')

const ctrl = require("../../controllers/contacts/index.js")

const router = express.Router()

const { ctrlWrapper } = require('../../helpers')

const { schemas } = require('../../models/contactModel')
const { validateBody, isValidId } = require('../../middlewares')

router.get('/', ctrlWrapper(ctrl.getAll))
router.get('/:contactId', ctrlWrapper(ctrl.getById))
router.post('/', validateBody(schemas.addContactSchema),
    ctrlWrapper(ctrl.add))
router.put('/:contactId', isValidId,
    validateBody(schemas.addContactSchema),
    ctrlWrapper(ctrl.updateById))
router.delete('/:contactId',
    ctrlWrapper(ctrl.deleteById))
router.patch('/:contactId/favorite',
    validateBody(schemas.updateFieldFavoriteSchema),
    ctrlWrapper(ctrl.updateFavorite))

module.exports = router