const Contact = require('./schema-contacts');

const getAllContacts = async () => {
  return await Contact.find({});
};

const getContactById = async contactId => {
  return await Contact.findById({ _id: contactId });
};

const addContact = async body => {
  console.log(body);
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true },
  );
};

const removeContact = async contactId => {
  return await Contact.findByIdAndRemove({ _id: contactId });
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
