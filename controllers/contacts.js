const Contact = require('../models/contacts');

const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
  const { name, email, phone, favorite } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newContact = { id: uuidv4(), name, email, phone, favorite: favorite || false };
  contacts.push(newContact);
  return res.status(201).json(newContact);
};

const updateContactById = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex !== -1) {
    contacts[contactIndex] = {
      ...contacts[contactIndex],
      name: name || contacts[contactIndex].name,
      email: email || contacts[contactIndex].email,
      phone: phone || contacts[contactIndex].phone,
      favorite: favorite !== undefined ? favorite : contacts[contactIndex].favorite,
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

const getFavoriteContacts = async (req, res) => {
  try {
    const favoriteContacts = await Contact.find({ favorite: true });
    res.json(favoriteContacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContact,
  getFavoriteContacts,
};
