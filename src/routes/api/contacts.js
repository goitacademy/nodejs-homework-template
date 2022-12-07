const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const { addContactValidation,
  putContactValidation, patchContactValidation } = require('../../middlewares/validationMiddlware');
const {getAllContactsController,
  getContactController,
  postContactController,
  deleteContactController,
  putContactController,
  patchContactController,
} = require('../../controllers/contactsController');

// GET all contacts
router.get('/', getAllContactsController);

// GET contact by ID
router.get('/:contactId', getContactController);

// POST - add new contact
router.post('/', addContactValidation, postContactController);

// DELETE - remove contact by ID
router.delete('/:contactId', deleteContactController);

// PUT - update contact by ID
router.put('/:contactId', putContactValidation, putContactController);

// PATCH - update contact field 'favorite' by contact ID
router.patch('/:contactId/favorite', patchContactValidation, patchContactController) 
module.exports = router;
