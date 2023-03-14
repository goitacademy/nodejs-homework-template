const express = require('express')
const router = express.Router()

const { addContactValid, changeContactValid } = require('../../middlewares/validationMiddleware');
const { getContacts, getContactsById, addNewContact, deleteContact, changeContact, updateStatus } = require('../../controllers/contactsControllers');


router.get('/', getContacts)
router.get('/:contactId', getContactsById)
router.post('/', addContactValid, addNewContact)
router.delete('/:contactId', deleteContact)
router.patch('/:contactId/favorite', updateStatus);
router.put('/:contactId', changeContactValid, changeContact)


module.exports = router
