const express = require('express')
const { addContactValidation, updateContactValidation, updateStatusValidation } = require('../../middlewares/validationMiddleware');
const { getContactsController, getContactByIdController, addContactController, removeContactController, updateContactController, updateStatusContactController } = require('../../controllers/contactsController');
const { asyncWrapper } = require('../../helpers/apiHelpers');

const router = express.Router()

router.get('/', asyncWrapper(getContactsController));
router.get('/:contactId', asyncWrapper(getContactByIdController));
router.post('/', addContactValidation, asyncWrapper(addContactController));
router.delete('/:contactId', asyncWrapper(removeContactController));
router.put('/:contactId', updateContactValidation, asyncWrapper(updateContactController));
router.patch('/:contactId/favorite', updateStatusValidation, asyncWrapper(updateStatusContactController));

module.exports = router
