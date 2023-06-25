const express = require('express')
const contactController = require('../../controller/contactController')
const joiConfig = require('../../joiconfig');
const router = express.Router()

router.get('/', contactController.read)

router.get('/:contactId',contactController.getById)

router.post('/',contactController.create )

router.delete('/:contactId', contactController.deleted)

router.put('/:contactId', contactController.update)

module.exports = router
