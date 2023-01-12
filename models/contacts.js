const { Contacts } = require('./db-connection');

const listContacts = async () => {
  const contacts = await Contacts.find({});
  return contacts;
};

const getContactById = async contactId => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

const removeContact = async contactId => {
  const removedContact = await Contacts.findByIdAndRemove(contactId);
  return removedContact;
};

const addContact = async body => {
  const newContact = await Contacts.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contacts.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  );
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {
  const updatetedStatusContact = await Contacts.findByIdAndUpdate(
    contactId,
    { favorite: body.favorite },
    { new: true }
  );
  return updatetedStatusContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
