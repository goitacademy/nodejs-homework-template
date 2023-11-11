import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "UTF8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to retrieve the contact list: ${error.message}`);
  }
}

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result || null;
  } catch (error) {
    throw new Error(`Failed to retrieve the contact list: ${error.message}`);
  }
}

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    }
  
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    throw new Error(`Failed to retrieve the contact list: ${error.message}`);
  }
}

export const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error(`Failed to retrieve the contact list: ${error.message}`);
  }
}

export const updateContact = async (contactId, data) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { ...contacts[index], ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  } catch (error) {
    throw new Error(`Failed to retrieve the contact list: ${error.message}`);
  }
}