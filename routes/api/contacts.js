const express = require('express');
const contactsService = require('../../services/contactsServices'); // Upewnij się, że ścieżka jest poprawna

const router = express.Router();

// Pobierz listę wszystkich kontaktów
router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// Pobierz kontakt po ID
router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// Dodaj nowy kontakt
router.post('/', async (req, res, next) => {
  try {
    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// Usuń kontakt po ID
router.delete('/:contactId', async (req, res, next) => {
  try {
    const deletedContact = await contactsService.removeContact(req.params.contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

// Aktualizuj kontakt po ID
router.put('/:contactId', async (req, res, next) => {
  try {
    const updatedContact = await contactsService.updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

