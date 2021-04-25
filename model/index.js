const Contacts = require('./schemas/contact');

const listContacts = async () => {
  const results = await Contacts.find();
  return results;
};

const getContactById = async (contactId) => {
  const result = await Contacts.findById(contactId);
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contacts.findByIdAndRemove(contactId);
  return result;
};

const addContact = async (body) => {
  const result = await Contacts.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contacts.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true },
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
