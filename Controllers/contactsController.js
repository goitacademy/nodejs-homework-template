const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsFilePath = path.join(__dirname, '../models/contacts.json');

const loadContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];  // Devuelve un array vacío si el archivo no existe
    }
    console.error('Error loading contacts:', error.message);
    throw new Error('Error loading contacts');
  }
};

const saveContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving contacts:', error.message);
    throw new Error('Error saving contacts');
  }
};

const listContacts = async (req, res) => {
  try {
    const contacts = await loadContacts();
    console.log('Contacts:', contacts);
    res.json(contacts);
  } catch (error) {
    console.error('Error in listContacts:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const contacts = await loadContacts();
    const contactId = req.params.id;
    const contact = contacts.find((c) => c.id === contactId);

    if (!contact) {
      return res.status(404).json({ error: 'Not Found', message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error in getContactById:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const addContact = async (req, res) => {
  try {
    const contacts = await loadContacts();
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Bad Request', message: 'Name, email, and phone are required' });
    }

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await saveContacts(contacts);
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error in addContact:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const removeContact = async (req, res) => {
  try {
    const contacts = await loadContacts();
    const contactId = req.params.id;
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(404).json({ error: 'Not Found', message: 'Contact not found' });
    }

    const deletedContact = contacts.splice(contactIndex, 1)[0];
    await saveContacts(contacts);
    res.json({ message: 'Contact deleted', deletedContact });
  } catch (error) {
    console.error('Error in removeContact:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contacts = await loadContacts();
    const contactId = req.params.id;
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(404).json({ error: 'Not Found', message: 'Contact not found' });
    }

    const { name, email, phone } = req.body;
    const updatedContact = {
      id: contactId,
      name,
      email,
      phone,
    };

    contacts[contactIndex] = updatedContact;
    await saveContacts(contacts);
    res.json(updatedContact);
  } catch (error) {
    console.error('Error in updateContact:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
