import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";

export const listContacts = async () => {
  try {
    const data = await readFile("models/contacts.json");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((item) => item.id === contactId);
  } catch (error) {
    return error;
  }
};

export const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const id = nanoid();
    const newContact = { id: id, ...body };
    const updatedContacts = [...contacts, newContact];
    await writeFile("models/contacts.json", JSON.stringify(updatedContacts));
    return newContact;
  } catch (error) {
    return error;
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    if (contacts.find((item) => item.id === contactId)) {
      const updatedContacts = contacts.filter((item) => item.id !== contactId);
      await writeFile("models/contacts.json", JSON.stringify(updatedContacts));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

export const updateContact = async (contactId, body) => {};
