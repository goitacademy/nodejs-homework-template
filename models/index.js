import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import exp from "constants";


const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


export const getAllContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

export const getContactById = async (id) => {
    const contacts = await getAllContacts();
    const result = contacts.find((item) => item.id === id);
    return result || null;
};

export const removeContact = async (id) => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
};

export const addContact = async (data) => {
    const contacts = await getAllContacts();
    const newContacts = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContacts;
};

export const updateContact = async (id, body)=>{
    const contacts = await getAllContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], ...body };
  await updateContacts(contacts);
  return contacts[index];
};


// // const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
