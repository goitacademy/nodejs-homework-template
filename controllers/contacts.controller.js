const { Contact } = require('../models/contact');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id email');

  return contacts;
};

const getContactById = async contactId => {
  const contact = Contact.findById(contactId);
  return contact;
};

const removeContact = async contactId => {
  const contact = await Contact.findByIdAndRemove(contactId);
  return contact;
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  return newContact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
};
