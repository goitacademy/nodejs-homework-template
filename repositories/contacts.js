const { Contact } = require("../model/contact");

const readContacts = async () => {
  const result = await Contact.find();
  return result;
};
const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId });
  return result;
};
const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, { ...body });
  return result;
};
const updateContactStatus = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, {
    favorite: body.favorite,
  });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
