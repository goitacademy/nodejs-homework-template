const Contact = require('../models/contactModel');

async function createContact(body) {
  return Contact.create(body);
}

async function getContactById(id) {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error(404, 'Contact is not defined');
  }

  return contact;
}

async function getAllContacts() {
  return Contact.find();
}

async function deleteContact(id) {
  await Contact.findByIdAndDelete(id);
}

async function updateContact(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}

async function updateStatusContact(id, body) {
  return Contact.findByIdAndUpdate(id, body, { new: true });
}

module.exports = {
  createContact,
  getContactById,
  getAllContacts,
  deleteContact,
  updateContact,
  updateStatusContact,
};
