const fs = require('fs/promises');
const path = require("path");
// const {nanoid} = require('nanoid');
const {v4} = require('uuid')

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const removeContact = async (contactId) => {

};

const addContact = async (body) => {

};

const updateContact = async (contactId, body) => {

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
