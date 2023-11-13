import fs from "fs/promises";
import { nanoid } from "nanoid";
import { resolve } from "path";

const contactsPath = resolve("models", "contacts.json");

const getContactIndex = (contacts, contactId) =>
  contacts.findIndex((contact) => contact.id === contactId);

const updateContact = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  try {
    const contactsBuffer = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsBuffer);
    return contacts;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function getContactById(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsData);
    const index = getContactIndex(contacts, contactId);
    return index === -1 ? null : contacts[index];
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsData);
    const index = getContactIndex(contacts, contactId);

    if (index === -1) return null;

    const [result] = contacts.splice(index, 1);
    updateContact(contacts);
    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsBuffer = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsBuffer);
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
