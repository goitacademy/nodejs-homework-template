const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contactsController.js')
const authMiddleware = require('../../middlewares/authMiddleware.js')

router.get('/', authMiddleware, contactsController.listContacts)
router.get('/:id', authMiddleware, contactsController.getContactById)
router.put('/:id', authMiddleware, contactsController.updateContact)
router.post('/', authMiddleware, contactsController.addContact)
router.delete('/:id', authMiddleware, contactsController.removeContact)
router.patch('/:id/favorite', authMiddleware, contactsController.updateContactStatus)

module.exports = router
