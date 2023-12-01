const express = require('express')

const isValidId = require('../../helpers/isValidObjectId')

const authenticate = require('../../middlewares/authenticate')

const ContactController = require('../../controllers/contact')

const router = express.Router()

const jsonParser = express.json() 

router.get('/', authenticate, ContactController.getContacts)  

router.get('/:id', authenticate, isValidId, ContactController.getContactById)

router.post('/', authenticate, jsonParser, ContactController.createContact)

router.delete('/:id', authenticate, isValidId, jsonParser, ContactController.deleteContact)

router.put('/:id', authenticate, isValidId, ContactController.updateContact)

router.patch('/:id', authenticate, isValidId, jsonParser, ContactController.patchFavorites)

module.exports = router