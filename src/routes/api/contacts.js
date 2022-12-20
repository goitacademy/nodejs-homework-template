const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const { addContactValidation, putContactValidation, updateContactFavouriteValidation, isValidId, auth } = require('../../middlewares');
const {getAllContactsController,
  getContactController,
  postContactController,
  deleteContactController,
  putContactController,
  updateContactFavouriteController,
} = require('../../controllers');
const {controllerCheck} = require('../../utils'); 

// GET all contacts
router.get('/', auth, controllerCheck(getAllContactsController));

// GET contact by ID
router.get('/:contactId', isValidId, controllerCheck(getContactController));

// POST - add new contact
router.post('/', auth, addContactValidation, controllerCheck(postContactController));

// DELETE - remove contact by ID
router.delete('/:contactId', isValidId, controllerCheck(deleteContactController));

// PUT - update contact by ID
router.put('/:contactId', isValidId, putContactValidation, controllerCheck(putContactController));

// PATCH - update contact field 'favourite' by contact ID
router.patch('/:contactId/favourite', isValidId, updateContactFavouriteValidation, controllerCheck(updateContactFavouriteController) ) 


module.exports = router;
