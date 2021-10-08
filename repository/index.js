const { Contact } = require("../model/contact");

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove({ _id: contactId });
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, { ...body }, { new: true });

  // or
  // return await Contact.findByIdAndUpdate(
  //   { _id: contactId },
  //   { ...body },
  //   { new: true }
  // );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
