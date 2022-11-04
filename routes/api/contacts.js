const express = require('express')
const router = express.Router()
const {ctrlWrapper} = require('../../helpers')
const {schemas} = require('../../models/contact')
const {validateBody, isValidId, isAuthorized} = require('../../middlewares')
const {add, getAll, getById, updateById, removeById, updateStatusContact} = require('../../controllers/contacts')

router.get('/',isAuthorized,ctrlWrapper(getAll))
router.get('/:contactId',isValidId, ctrlWrapper(getById))
router.post('/',isAuthorized,validateBody(schemas.validateAddSchema),ctrlWrapper(add))
router.delete('/:contactId',isValidId,ctrlWrapper(removeById))
router.put('/:contactId',isValidId,validateBody(schemas.validateAddSchema),ctrlWrapper(updateById))
router.patch('/:contactId/favorite', isValidId, validateBody(schemas.validateFavoritePatchSchema),ctrlWrapper(updateStatusContact) )

module.exports = router
