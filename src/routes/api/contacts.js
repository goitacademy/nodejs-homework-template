const express = require('express');
const router = new express.Router();
const {
  addPostValidation,
  addPutValidation
} = require('../../middlewares/validationMiddleware');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const contactsController = require('../../controllers/contactsController');

router.get('/', asyncWrapper(contactsController.getContacts));
router.get('/:contactId',asyncWrapper(contactsController.getById));
router.post('/', addPostValidation, asyncWrapper(contactsController.createContact));
router.delete('/:contactId', asyncWrapper(contactsController.removeContact));
router.put('/:contactId', addPutValidation, asyncWrapper(contactsController.changeContact));
// router.patch('/:contactId', addPatchValidation, contactsController.patchContact);

module.exports = router;
