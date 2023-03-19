const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../../utils');
const { addContactMiddleware, changeContactMiddleware, authMiddleware } = require('../../middlewares');
const { getContacts, getContactsById, addNewContact, deleteContact, changeContact, updateStatus } = require('../../controllers/contacts');


router.use(authMiddleware)

router.get('/', asyncWrapper(getContacts))
router.get('/:contactId', asyncWrapper(getContactsById))
router.post('/', addContactMiddleware, asyncWrapper(addNewContact))
router.delete('/:contactId', asyncWrapper(deleteContact))
router.patch('/:contactId/favorite', asyncWrapper(updateStatus));
router.put('/:contactId', changeContactMiddleware, asyncWrapper(changeContact))


module.exports = router
