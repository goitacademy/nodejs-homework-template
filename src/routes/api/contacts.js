const express = require('express')
const { getContactsController,
    getContactByIdController,
    removeContactController,
    addContactController,
    updateContactController,
    updateStatusContactController } = require('../../controllers/contactsControllers')

const router = express.Router()
const { addContactValidation, changeContactValidation, updateStatusValidation } = require('../middlewares/validation')
const { asyncWrapper } = require('../../helpers/apiHelpers')

router.get('/', asyncWrapper(getContactsController))
router.get('/:contactId', asyncWrapper(getContactByIdController))
router.post('/', addContactValidation, asyncWrapper(addContactController))
router.delete('/:contactId', asyncWrapper(removeContactController))
router.put('/:contactId', changeContactValidation, asyncWrapper(updateContactController))
router.patch('/:contactId/favorite', updateStatusValidation, asyncWrapper(updateStatusContactController))

module.exports = router