const express = require('express');
const { assyncWrapper } = require('../../helpers');
const {
  getContactByIdController,
  getContactsListController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require('../../controllers');

const router = express.Router();

router.get('/', assyncWrapper(getContactsListController));
router.get('/:contactId', assyncWrapper(getContactByIdController));
router.post('/', assyncWrapper(addContactController));
router.delete('/:contactId', assyncWrapper(removeContactController));
router.put('/:contactId', assyncWrapper(updateContactController));
router.patch('/:contactId/favorite', assyncWrapper(updateStatusContactController));

module.exports = router;
