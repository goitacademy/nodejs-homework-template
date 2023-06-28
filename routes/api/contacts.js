const express = require('express')
const contactController = require('../../controller/contactController')

const router = express.Router()
const {validateBody} = require('../../middlewares/contacts')

router.get('/', contactController.read)

router.get('/:contactId',contactController.getById)

router.post('/',validateBody,contactController.create )

router.delete('/:contactId', contactController.deleted)

router.put('/:contactId',validateBody, contactController.update)

module.exports = router
