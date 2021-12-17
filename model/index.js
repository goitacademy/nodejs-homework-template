import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import contacts from "./contacts.json";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => {
  try {
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const result = contacts.splice(index, 1);
      await fs.writeFile(
        path.join(__dirname, "contacts.json"),
        JSON.stringify(contacts, null, 2)
      );
      return result;
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = { id: randomUUID(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const updateContact = { id: contactId, ...body };
      const [index] = updateContact;
      await fs.writeFile(
        path.join(__dirname, "contacts.json"),
        JSON.stringify(contacts, null, 2)
      );
      return result;
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
