const express = require('express');
const router = new express.Router();
const {
  addPostValidation,
  addPutValidation,
  addPatchValidation,
} = require('../../middlewares/contactValidation');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const ctrlContact = require('../../controllers/contactsController');

router.use(authMiddleware);

router.get('/', asyncWrapper(ctrlContact.getContacts));
router.get('/:contactId',asyncWrapper(ctrlContact.getById));
router.post('/', addPostValidation, asyncWrapper(ctrlContact.createContact));
router.delete('/:contactId', asyncWrapper(ctrlContact.removeContact));
router.put('/:contactId', addPutValidation, asyncWrapper(ctrlContact.changeContact));
router.patch('/:contactId', addPatchValidation, asyncWrapper(ctrlContact.patchContact));

module.exports = router;
