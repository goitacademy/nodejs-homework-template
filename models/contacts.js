const fs = require('fs/promises');
const path = require("path");
const nanoid = require('nanoid');
const Joi = require('joi');


const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res = contacts.find((item) => item.id === contactId.toString());
  return res || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.find((item) => item.id === contactId.toString());

  if(idx === -1) return null;
  const [res] = contacts.splice(idx,1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return res; 
}

const addContact = async (body) => {
  const {name, email, phone} = body;
  const contacts = await listContacts();
  const newContact = {id: nanoid(), name, email, phone};

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const {name, email, phone} = body;
  const newContact = {id: nanoid(), name, email, phone};
  const idx = contacts.find((item) => item.id === contactId.toString());
  
  if(idx === -1) return null;
  const [res] = contacts.splice(idx,1);
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
