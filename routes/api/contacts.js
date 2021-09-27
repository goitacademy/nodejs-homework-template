const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contacts')

router.get('/', contactsController.getAll)

router.get('/:id', contactsController.getById)

router.post('/', contactsController.add)

router.delete('/:id', contactsController.removeById)

router.put('/:id', contactsController.updateById)

module.exports = router
