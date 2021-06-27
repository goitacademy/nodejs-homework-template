const express = require('express')
const router = express.Router()
const contactsController = require('../controllers/contactsController')
const { authMiddleware } = require('../middlewares/authMiddleware')

router.use(authMiddleware)

router.get('/', contactsController.listContacts)

router.get('/:contactId', contactsController.getContactById)

router.get('/contacts?favorite=true', contactsController.getFavoriteContacts)

router.post('/', contactsController.addContact)

router.delete('/:contactId', contactsController.removeContact)

router.put('/:contactId', contactsController.updateContact)

router.patch('/:contactId', contactsController.updateStatusContact)

module.exports = router
