const fs = require('fs/promises');
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");
const { v4 } = require('uuid');


const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  }
  catch (err) {
    console.error(err);
  }
};


const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const found = contacts.find(el => el.id === id.toString());
    if (!found) {
      return found === null;
    }
    return found;
  }
  catch (err) {
    console.error(err);
  }
};


const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const found = contacts.filter(elem => elem.id !== id.toString());
    if (found.length === contacts.length) {
        return found === null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(found, null, '\t'));
    return found;
  }
  catch (err) {
    console.error(err);
  }
};


const addContact = async ( name, email, phone ) => {
  try {
    const contacts = await listContacts();
    const data = { id: v4(), name, email, phone };
    if (!data.name || !data.email || !data.phone) {
      return data;
    }
    contacts.push(data);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'));
    return data;
  }
  catch (err) {
    console.error(err);
  }
};

const updateContact = async (id, { name, email, phone }) => { };



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
