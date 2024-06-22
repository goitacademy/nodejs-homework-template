import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.resolve("models", "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Error reading file:", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result || null;
  } catch (error) {
    console.error("Error reading file:", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const deletedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  } catch (error) {
    console.error("Error reading file:", error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const allContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Validation error or error writing file:", error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const findIndex = contacts.findIndex((contact) => contact.id === contactId);
    const updatedContact = contacts.find((contact) => contact.id === contactId);

    if (!updatedContact) {
      return null;
    }
    Object.entries(body).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(updatedContact, key)) {
        updatedContact[key] = value;
      }
    });

    contacts.splice(findIndex, 1);

    const allContacts = [...contacts, updatedContact];
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return updatedContact;
  } catch (error) {
    console.error(
      "Validation error or error reading/writing file:",
      error.message
    );
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};