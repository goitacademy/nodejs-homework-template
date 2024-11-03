const express = require('express');
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error); 
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: `Not Found: Contact ID ${contactId}` });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    
    if (!newContact) {
      return res.status(400).json({ message: 'Invalid data: please check name, email, and phone fields' });
    }
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const contactId = req.params.contactId;

    if (!name && !email && !phone) {
      return res.status(400).json({ message: "missing fields" });
    }

    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({ message: `Validation error: ${error.message}` });
    } else {
      next(error);
    }
  }
});


module.exports = router;
