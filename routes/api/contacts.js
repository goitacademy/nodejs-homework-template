const express = require('express')

const router = express.Router()

const contactsController = require('../../cntrl/contact-controler.js')

const {isValidId, authentication} = require("../../middlewares")


router.use(authentication)

router.get('/', contactsController.getAllContacts)

router.post('/', contactsController.addNewContacts)

router.get('/:contactId', isValidId, contactsController.getByIdContacts)

router.put('/:contactId', isValidId, contactsController.updateNewContacts)

router.patch('/:contactId/favorite', isValidId, contactsController.favoriteContact) 

router.delete('/:contactId', isValidId, contactsController.deleteByIdContacts)



module.exports = router
