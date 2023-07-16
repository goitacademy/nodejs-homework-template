const { Contact } = require("../model/contact");

const listContacts = async () => {
  const data = await Contact.find();
  return data;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

const addContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

const updateContacts = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove(id);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
