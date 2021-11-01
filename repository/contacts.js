const Contact = require('../model/contact');

const listContacts = async () => {
  const results = await Contact.find({});
  return results;
};

const getContactById = async contactId => {
  const result = await Contact.findById(contactId);
  return result;
};

const removeContact = async contactId => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
};

const addContact = async body => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
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
