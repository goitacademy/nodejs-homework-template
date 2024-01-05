// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");
// const contactsPath = path.join(__dirname, "/contacts.json");
const Contact = require("./contact");

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

async function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

async function addContact(body) {
  return Contact.create(body);
}

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateFavoriteStatus = async (contactId, favorite) => {
  return Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
};
