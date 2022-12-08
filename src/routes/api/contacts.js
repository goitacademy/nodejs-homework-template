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
const controllerCheck = require('../../utils/controllerCheck') 

// GET all contacts
router.get('/', controllerCheck(getAllContactsController));

// GET contact by ID
router.get('/:contactId', controllerCheck(getContactController));

// POST - add new contact
router.post('/', addContactValidation, controllerCheck(postContactController));

// DELETE - remove contact by ID
router.delete('/:contactId', controllerCheck(deleteContactController));

// PUT - update contact by ID
router.put('/:contactId', putContactValidation, controllerCheck(putContactController));

// PATCH - update contact field 'favorite' by contact ID
router.patch('/:contactId/favorite', patchContactValidation, controllerCheck(patchContactController) ) 
module.exports = router;
