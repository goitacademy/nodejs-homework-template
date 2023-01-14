const { Contact } = require('../models/contact-schema'); 

async function getContacts (req, res, next) {
  const contacts = await Contact.find({});
  console.log('contacts:', contacts);
  res.status(200).json(contacts);
};

async function getContact (req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json(contact);
};

async function createContact (req, res, next) {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ message: 'missing required name field' });
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

async function deleteContact (req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  await Contact.findByIdAndRemove(contactId);
  res.status(200).json({ message: 'contact deleted' });
};

async function updateSomeContact (req, res, next) {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) return res.status(400).json({ message: 'missing fields' });
  const response = await Contact.findByIdAndUpdate(req.params.contactId, req.body);
  if (response) return res.json(response);
  return res.status(404).json({ message: 'Not found' });
};

async function updateStatusContact(req, res, next) {
  const { favorite } = req.body;
  if (!favorite) return res.status(400).json({ message: 'missing field favorite' });
  const response = await Contact.findByIdAndUpdate(req.params.contactId, req.body);
  if (response) return res.json(response);
  return res.status(404).json({ message: 'Not found' });
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateSomeContact,
  updateStatusContact,
};
