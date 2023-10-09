const contacts = require('../models/contacts.json');
const { v4: uuidv4 } = require('uuid');

const listContacts = (req, res) => {
  res.json(contacts);
};

const getContactById = (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((contact) => contact.id === id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

const addContact = (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  return res.status(201).json(newContact);
};

const updateContactById = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex !== -1) {
    contacts[contactIndex] = {
      id,
      name: name || contacts[contactIndex].name,
      email: email || contacts[contactIndex].email,
      phone: phone || contacts[contactIndex].phone,
    };
    res.json(contacts[contactIndex]);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

const deleteContact = (req, res) => {
  const { id } = req.params;
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index !== -1) {
    contacts.splice(index, 1);
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContact,
};
