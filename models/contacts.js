import fs from "node:fs/promises";
import { nanoid } from "nanoid";
import * as path from "path";

const contactsPath = path.resolve("./models", "contacts.json");

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.log(`Error getting contact with id ${contactId}: `, error);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const position = contacts.findIndex((contact) => contact.id === contactId);
    const removedContact = contacts.splice(position, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.log(`Error removing contact with id ${contactId}: `, error);
  }
};

export const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = body;
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    const updatedContact = { ...contact, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(updatedContact, null, 2));
    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
};
