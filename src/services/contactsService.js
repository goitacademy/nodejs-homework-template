const { WrongParametersError } = require("../helpers");
const { Contact } = require("../db");

const getContacts = async () => {
  const contacts = await Contact.find({});
  if (!contacts || contacts.length < 1) {
    throw new WrongParametersError("Your contact list is empty");
  }
  return contacts;
};

const getContactById = async (id) => {
  const targetedContact = await Contact.findById(id);
  return targetedContact;
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  const isFavorite = favorite || false;
  const contact = new Contact({ name, email, phone, favorite: isFavorite });
  await contact.save();
  return contact;
};

const deleteContact = async (id) => {
  const removedContact = await Contact.findByIdAndRemove(id);
  return removedContact;
};

const changeContact = async (id, fields) => {
  await Contact.findByIdAndUpdate(id, fields);
  const contact = await Contact.find({ _id: id });
  return contact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
};
