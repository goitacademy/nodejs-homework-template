const express = require('express');
const router = new express.Router();
const {
  addPostValidation,
  addPatchValidation } = require('../../middlewares/validationMiddleware');
const contactsController = require('../../controllers/contactsController');

// GET /api/contacts => [...contacts]
router.get('/', contactsController.getContacts);

// GET /api/contacts/123 => {post with id 123}
router.get('/:contactId', contactsController.getById);

// POST /api/contacts => [newContact, ...contacts]
router.post('/', addPostValidation, contactsController.createContact);

// DELETE /api/contacts/123 => [contacts without contact with id 123]
router.delete('/:contactId', contactsController.removeContact);

// PUT /api/contacts/123 => [changedContact, ...contacts]
router.put('/:contactId', addPostValidation, contactsController.changeContact);

// PATCH /api/contacts/123 => [changedContact, ...contacts]
router.patch('/:contactId', addPatchValidation, contactsController.patchContact);

module.exports = router;
