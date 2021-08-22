const express = require('express')
const router = express.Router()

const controller = require('../../controllers/contacts')

router.get('/', controller.getList)

router.get('/:contactId', controller.getById)

router.post('/', controller.addNew)

router.delete('/:contactId', controller.remove)

router.patch('/:contactId', controller.updateById)

module.exports = router
