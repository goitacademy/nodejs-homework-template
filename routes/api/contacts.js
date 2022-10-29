const express = require('express')
const router = express.Router()
const {ctrlWrapper} = require('../../helpers')
const {schemas} = require('../../models/contact')
const {validateBody, isValidId} = require('../../moddlewares')
const {add, getAll, getById, updateById, removeById, updateStatusContact} = require('../../controllers')

router.get('/',ctrlWrapper(getAll))
router.get('/:contactId',isValidId, ctrlWrapper(getById))
router.post('/',validateBody(schemas.validateAddSchema),ctrlWrapper(add) )
router.delete('/:contactId',isValidId,ctrlWrapper(removeById))
router.put('/:contactId',isValidId,validateBody(schemas.validateAddSchema),ctrlWrapper(updateById))
router.patch('/:contactId/favorite', isValidId, validateBody(schemas.validateFavoritePatchSchema),ctrlWrapper(updateStatusContact) )

module.exports = router
