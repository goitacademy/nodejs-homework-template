const { Contact } = require('../models/contactsModels');

async function listContacts() {
  const contact = await Contact.find({});
  return contact;
}

async function getContactById(id) {
  const contact = await Contact.findById(id);
  return contact;
}

async function addContact(body) {
  const savedContact = await Contact.create(body)
  return savedContact;
}

async function removeContact(id) {
  const contact = await Contact.findByIdAndRemove(id)
  return contact;
}

async function updateContact(id, body) {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { ...body },
    {new: true}
  )
  return contact;
}

async function updateStatusContact(id, { favorite }) {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { $set: { favorite } },
    {
      new: true,
    }
  );
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};