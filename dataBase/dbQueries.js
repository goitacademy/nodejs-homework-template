const ContactModel = require("../schemas/contactsSchema.js");

const listContacts = async () => {
  const data = await ContactModel.find();
  return data;
};

const getContactById = async (contactId) => {
  const data = await ContactModel.findById(contactId);
  return data;
};

const addNewContact = async (body) => {
  const newContact = await ContactModel.create(body);
  return newContact;
};

const removeContact = async (contactId) => {
  const result = await ContactModel.findByIdAndRemove({ _id: contactId });
  return result;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await ContactModel.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addNewContact,
  removeContact,
  updateContact,
};
