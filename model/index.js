const fs = require('fs/promises')
const path = require("path")
const contacts = require('./contacts.json');
const { v4 } = require("uuid");

const getData = async () => {
  const data = await fs.readFile(path.join(__dirname, "contacts.json"), "utf8");
  return JSON.parse(data);
};

const listContacts = async () => {
  return await getData();
}

const getContactById = async (contactId) => {
  const data = await getData();
  const selectContact = data.find((contact) => contact.id.toString() === contactId.toString());
  return selectContact;
};
 

const removeContact = async (contactId) => {}


const addContact = async (body) => {
  const data = await getData();
  const newContact = {...body, id:v4()};
  return data.push(newContact)
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
