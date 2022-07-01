const fs = require('fs/promises');
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");
const { v4 } = require('uuid');


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};


const getContactById = async (id) => {
  const contacts = await listContacts();
  const found = contacts.find(el => el.id === id.toString());
  if (!found) {
    return found === null;
  }
  return found;
};


const removeContact = async (id) => {
  const contacts = await listContacts();
  const found = contacts.filter(elem => elem.id !== id.toString());
  if (found.length === contacts.length) {
    return found === null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(found, null, '\t'));
  return found;
};


const addContact = async ( name, email, phone ) => {
  const contacts = await listContacts();
  const data = { id: v4(), name, email, phone };
  
  contacts.push(data);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'));
  return data;
};


const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  let found = null;
  contacts.forEach(el => {
    if (el.id === id.toString()) {
      found = el
      el.name = name 
      el.email = email
      el.phone = phone
    }
  })
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'));
  return found;
};



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
