import path from 'path';
import fs from 'fs/promises';
// import { loadFile, saveFile, } from '../utilites/useFile.js';
const contactsPath = path.resolve("./models/contacts.json");
console.log(contactsPath);


const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find( ({id})  => id === contactId);
   
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};


const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = await getContactById(contactId);
    const newContacts = await contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};


const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
