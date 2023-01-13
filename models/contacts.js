import path from 'path';
import fs from 'fs/promises';
import { v4 } from 'uuid';
const contactsPath = path.resolve("./models/contacts.json");



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
    const contact = contacts.find(({ id }) => id === contactId);

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


const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: v4(),
      ...body,
    };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) return;
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    console.log(error.message);
  }
};
export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
