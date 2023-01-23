const { Contact } = require("./contactModel");

async function listContacts() {
  const contacts = await Contact.find({});
  return contacts;
}

async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);

  if (!contact)
    throw new WrongParamsError(`Contact with id: ${contactId} not found`);

  return contact;
}

async function removeContact(contactId) {
  const data = await Contact.findByIdAndDelete(contactId);
  if (!data)
    throw new WrongParamsError(`Contact with id: ${contactId} not found`);

  return;
}

async function addContact(body) {
  const newContact = await Contact.create(body);
  return newContact;
}

async function updateContact(contactId, body) {
  const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });

  if (!data)
    throw new WrongParamsError(`Contact with id: ${contactId} not found`);

  return data;
}

async function updateStatusContact(contactId, body) {
  const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });

  if (!data)
    throw new WrongParamsError(`Contact with id: ${contactId} not found`);

  return data;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
