const { Contact } = require("../db");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};
const getContactById = async (id) => {
  const targetedContact = await Contact.findById(id);
  return targetedContact;
};

const addContact = async () => {};
const deleteContact = async () => {};
const changeContact = async () => {};
const changeContactStatus = async () => {};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  changeContactStatus,
};
