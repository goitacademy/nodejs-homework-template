const contactsApi = require('../models/contacts');
const crypto = require('crypto');

const getContacts = async (_, res) => {
  try {
    const contacts = await contactsApi.listContacts();
    res.status(200).json({ contacts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsApi.getContactById(contactId);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addContact = async (req, res) => {
  try {
    const newContact = await contactsApi.addContact({ id: crypto.randomUUID(), ...req.body });

    if (newContact) {
      res.status(201).json(newContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsApi.removeContact(contactId);

    if (removedContact) {
      res.status(200).json({ message: `"${removedContact.name}" contact has been deleted.` });
    } else {
      res.status(404).json({ message: `Contact not found.` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contactsApi.updateContact(contactId, req.body);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: `Contact not found.` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getContacts, getContactById, addContact, deleteContactById, updateContactById };
