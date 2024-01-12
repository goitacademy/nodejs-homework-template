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
import * as path from "path";
import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./models", "contacts.json");

const getContacts = async () => {
  try {
    const contactsJson = await readFile(contactsPath);
    const contacts = JSON.parse(contactsJson);
    return contacts;
  } catch (err) {
    console.error("Error reading contacts from file: ", err);
    throw err;
  }
};

const setContacts = async (data) => {
  try {
    await writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing contacts to file: ", err);
    throw err;
  }
};

export const listContacts = async () => {
  try {
    return await getContacts();
  } catch (err) {
    console.log("Error getting contact list: ", err);
    throw err;
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    return contact;
  } catch (err) {
    console.log(`Error getting contact with id ${contactId}: `, err);
    throw err;
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await getContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      console.log(`Contact with id ${contactId} not found.`);

      return false;
    }

    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await setContacts(newContacts);
    console.log(`Contact with id ${contactId} removed successfully`);

    return true;
  } catch (err) {
    console.log(`Error removing contact with id ${contactId}: `, err);
    throw err;
  }
};

export const addContact = async (body) => {
  try {
    const contacts = await getContacts();
    const { name, email, phone } = body;
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await setContacts(contacts);
    console.log("Contact has been added successfully");

    return newContact;
  } catch (err) {
    console.log("Error adding new contact: ", err);
    throw err;
  }
};

export const updateContact = async (contactId, body) => {
  try {
    const contacts = await getContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      console.log(`There is no contact with id ${contactId} !`);

      return false;
    }

    const contact = contacts[index];
    const updatedContact = { ...contact, ...body };
    contacts[index] = updatedContact;
    await setContacts(contacts);
    console.log(`Contact has been updated successfully.`);

    return updatedContact;
  } catch (err) {
    console.error("An error occurred while updating contact: ", err);
    throw err;
  }
};
