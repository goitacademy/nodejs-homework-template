const express = require('express')
const contactController = require('../../controller/contactController')
const { validateNewContact, validateUpdatedContact } = require('../../middlewares/contact')
const joiConfig = require('../../joiconfig');
const router = express.Router()

router.get('/', contactController.read)

router.get('/:contactId',contactController.getById)

router.post('/',validateNewContact(joiConfig),contactController.create )

router.delete('/:contactId', contactController.deleted)

router.put('/:contactId',validateUpdatedContact(joiConfig), contactController.update)

module.exports = router
