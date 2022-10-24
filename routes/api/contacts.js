const express = require('express')
const router = express.Router()
const {ctrlWrapper} = require('../../helpers')
const {schemas} = require('../../models/contact')
const validateBody = require('../../moddlewares/validateBody')
const {add, getAll, getById, updateById, removeById} = require('../../controllers')

router.get('/',ctrlWrapper(getAll))
router.get('/:contactId',  ctrlWrapper(getById))
router.post('/',validateBody(schemas.validateAddSchema),ctrlWrapper(add) )
router.delete('/:contactId',ctrlWrapper(removeById))
router.put('/:contactId',validateBody(schemas.validateAddSchema),ctrlWrapper(updateById))

module.exports = router
