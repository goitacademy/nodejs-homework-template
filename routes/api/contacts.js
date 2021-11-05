const express = require('express')
const router = express.Router()
const contactsControllers = require('../../controllers/contacts')
const { joiContactsShcemaAdd, joiContactsShcemaUpd } = require('../../middlewares/validation/contactSchema')
const validation = require('../../middlewares/validation/validation')

router.get('/', contactsControllers.getAllContactsCtrl)

router.get('/:contactId', contactsControllers.getContactByIdCtrl)

router.post('/', validation(joiContactsShcemaAdd), contactsControllers.addContactCtrl)

router.delete('/:contactId', contactsControllers.removeContactCtrl)

router.patch('/:contactId', validation(joiContactsShcemaUpd), contactsControllers.updateContactCtrl)

router.patch('/:contactId/favorite', contactsControllers.updateStatusContact)

module.exports = router
