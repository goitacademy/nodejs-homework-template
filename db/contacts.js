import fs from 'fs/promises';
import path from "path";
import { nanoid } from "nanoid"

const contactsPath = path.resolve("db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      throw new Error(`Contact not found with ID ${contactId}`);
    }
    return contact;
  } catch (error) {
    throw new Error(`Could not retrieve contact with ID ${contactId}: ${error.message}`);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    if (updatedContacts.length === contacts.length) {
      throw new Error(`Contact not found with ID ${contactId}`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  } catch (error) {
    throw new Error(`Could not remove contact with ID ${contactId}: ${error.message}`);
  }
};


const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = {
      id: nanoid(),
      ...body
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error(`Could not add contact: ${error.message}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      throw new Error(`Contact not found with ID ${contactId}`);
    }
    const updatedContact = {
      ...contact,
      ...body,
      id: contactId
    };
    const updatedContacts = contacts.map((c) => (c.id === contactId ? updatedContact : c));
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContact;
  } catch (error) {
    throw new Error(`Could not update contact with ID ${contactId}: ${error.message}`);
  }
};


export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};


