const express = require('express');
const {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
} = require('../../middleware/validationsMiddlewares');
const {
  getAllContacts,
  getContactById,
  deleteContactById,
  addNewContact,
  updateContactById,
  updateStatusContact,
} = require('../../controllers/contactsControllers');
const { asyncWrapper, isValidId } = require('../../helpers/apiHelpers');

const router = express.Router();

router.get('/', asyncWrapper(getAllContacts));
router.get('/:contactId', isValidId, asyncWrapper(getContactById));
router.post('/', addContactValidation, asyncWrapper(addNewContact));
router.delete('/:contactId', isValidId, asyncWrapper(deleteContactById));
router.put('/:contactId', isValidId, updateContactValidation, asyncWrapper(updateContactById));
router.patch(
  '/:contactId/favorite',
  isValidId,
  updateStatusContactValidation,
  asyncWrapper(updateStatusContact)
);

module.exports = router;
