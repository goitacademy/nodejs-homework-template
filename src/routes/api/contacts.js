const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const { addContactValidation, putContactValidation, updateContactFavoriteValidation, isValidId } = require('../../middlewares');
const {getAllContactsController,
  getContactController,
  postContactController,
  deleteContactController,
  putContactController,
  updateContactFavoriteController,
} = require('../../controllers');
const {controllerCheck} = require('../../utils'); 

// GET all contacts
router.get('/', controllerCheck(getAllContactsController));

// GET contact by ID
router.get('/:contactId', isValidId, controllerCheck(getContactController));

// POST - add new contact
router.post('/', addContactValidation, controllerCheck(postContactController));

// DELETE - remove contact by ID
router.delete('/:contactId', isValidId, controllerCheck(deleteContactController));

// PUT - update contact by ID
router.put('/:contactId', isValidId, putContactValidation, controllerCheck(putContactController));

// PATCH - update contact field 'favorite' by contact ID
router.patch('/:contactId/favorite', isValidId, updateContactFavoriteValidation, controllerCheck(updateContactFavoriteController) ) 
module.exports = router;
