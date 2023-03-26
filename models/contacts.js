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

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  
};

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuid(),
    name,
    email,
    phone
  };
  
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
