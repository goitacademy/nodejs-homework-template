const { Contacts } = require("./contacts.model");

const listContacts = async () => {
  return await Contacts.find({});
};
const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  if (contact) {
    return contact;
  }
  return null;
};

const removeContact = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  if (contact) {
    await Contacts.findByIdAndDelete(contactId);
    return contact;
  }
  return null;
};

const addContact = async (body) => {
  const newContacts = await Contacts.create(body);
  return newContacts;
};

const updateContact = async (contactId, body) => {
  const update = await Contacts.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return update;
};

const updateStatusContact = async (contactId, body) => {
  const update = await Contacts.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return update;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
