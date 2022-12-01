const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const { addContactValidation,
  putContactValidation } = require('../../middlewares/validationMiddlware');
const {getAllContacts,
  getContact,
  postContact,
  deleteContact,
  putContact} = require('../../controllers/contactsController');

// GET all contacts
router.get('/', getAllContacts);

// GET contact by ID
router.get('/:contactId', getContact);

// POST - add new contact
router.post('/', addContactValidation, postContact);

// DELETE - remove contact by ID
router.delete('/:contactId', deleteContact);

// PUT - update contact by ID
// (remove old contact + add new contact = {...oldContact, ...req.body})
router.put('/:contactId', putContactValidation, putContact);

module.exports = router;
