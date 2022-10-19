const express = require('express')
const router = express.Router()
const {ctrlWrapper} = require('../../helpers')
const {add, getAll, getById, updateById, removeById} = require('../../controllers')

router.get('/', ctrlWrapper(getAll))
router.get('/:contactId', ctrlWrapper(getById))
router.post('/',ctrlWrapper(add) )
router.delete('/:contactId',ctrlWrapper(removeById))
router.put('/:contactId',ctrlWrapper(updateById))

module.exports = router
