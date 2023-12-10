const express = require('express')

const isValidId = require('../../helpers/isValidObjectId')

const router = express.Router()

const jsonParser = express.json()

const ContactController = require('../../controllers/contact')

router.get('/', ContactController.getContacts)  

router.get('/:id', isValidId, ContactController.getContactById)

router.post('/', jsonParser, ContactController.createContact)

router.delete('/:id', isValidId, jsonParser, ContactController.deleteContact)

router.put('/:id', isValidId, ContactController.updateContact)

router.patch('/:id', isValidId, jsonParser, ContactController.patchFavorites)

module.exports = router