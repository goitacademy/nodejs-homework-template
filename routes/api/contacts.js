const express = require('express');

const contactsController = require('../../controllers/contacts-controller.js');

const contactValidation = require('../../middleware/validation/contacts-validation');

const router = express.Router()

router.get('/', contactsController.getAll)

router.get('/:contactId', contactsController.getById)

router.post('/', contactValidation.addContactValidation, contactsController.add)

router.delete('/:contactId', contactsController.deleteById)

router.put('/:contactId', contactValidation.addContactValidation, contactsController.updateById)

module.exports = router
