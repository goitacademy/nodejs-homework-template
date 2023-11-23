import { readFile } from "fs/promises";

export const listContacts = async () => {
  try {
    const data = await readFile("models/contacts.json");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId) => {};

export const removeContact = async (contactId) => {};

export const addContact = async (body) => {};

export const updateContact = async (contactId, body) => {};
