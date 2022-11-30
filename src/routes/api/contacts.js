const express = require('express');
const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../models/contacts');


const router = express.Router();
const { addContactValidation, putContactValidation } = require('../../middlewares/validationMiddlware');

// GET all contacts
router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts, status: 200 });
})

// GET contact by ID
router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  
  if (!contact) {
    res.status(404).json({ "message": "Not found", status: 404 });
    return;
  }
  
  res.status(200).json({ contact, status: 200 });
})

// POST - add new contact
router.post('/', addContactValidation, async (req, res, next) => {  
  const newContact = await addContact(req.body);
  res.status(201).json({ newContact, status: 201 });
})

// DELETE - remove contact by ID
router.delete('/:contactId', async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  
  if (!contact) {
    res.status(404).json({ "message": "Not found", status: 404 });
    return;
  }
  
  res.status(200).json({ "message": "contact deleted", status: 200 });
})

// PUT - update contact by ID /remove contact + add contact with new body and the same ID 
router.put('/:contactId', putContactValidation, async (req, res, next) => {
    const { name, email, phone } = req.body;
  
  if (!name && !email && !phone) {
    res.status(400).json({ "message": "missing fields", status: 400 });
    return;
  }

  const updatedContact = await updateContact(req.params.contactId, req.body);
  if(!updatedContact) {
    res.status(404).json({ "message": "Not found" });
    return;
  }
  res.status(200).json({ updatedContact, message: 'successfully updated' });
})

module.exports = router
