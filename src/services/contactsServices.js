const { Contact } = require("../db/contactModel");
const { WrongParametersError } = require("../helpers/errors");

async function getContacts() {
  const contacts = await Contact.find({});
  return contacts;
}

async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new WrongParametersError("Not found");
  }

  return contact;
}

async function removeContact(contactId) {
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw new WrongParametersError("Not found");
  }

  return result;
}

async function addContact(newContact) {
  const contact = new Contact(newContact);
  await contact.save();
  return contact;
}

async function updateContact(contactId, body) {
  const contact = await Contact.findByIdAndUpdate(contactId, { $set: body });

  if (!contact) {
    throw new WrongParametersError("Not found");
  }

  return contact;
}

async function updateStatusContact(contactId, body) {
  if (body.favorite === undefined) {
    throw new WrongParametersError("missing field favorite");
  }

  const contact = await Contact.findByIdAndUpdate(contactId, { $set: body });

  if (!contact) {
    throw new WrongParametersError("Not found");
  }
  contact.favorite = body.favorite;

  return contact;
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  getContacts,
  updateContact,
  updateStatusContact,
};
