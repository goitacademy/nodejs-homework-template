const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

async function getContacts (req, res, next) {
  const contacts = await listContacts();
  console.log('contacts:', contacts);
  res.status(200).json(contacts);
};

async function getContact (req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json(contact);
};

async function createContact (req, res, next) {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ message: 'missing required name field' });
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

async function deleteContact (req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  await removeContact(contactId);
  res.status(200).json({ message: 'contact deleted' });
};

async function updateSomeContact (req, res, next) {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) return res.status(400).json({ message: 'missing fields' });
  const response = await updateContact(req.params.contactId, req.body);
  if (response) return res.json(response);
  return res.status(404).json({ message: 'Not found' });
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateSomeContact,
};
