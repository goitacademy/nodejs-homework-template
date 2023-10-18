// ! Функції для роботи з контактами
import fs from "fs/promises";
import path from "path";
import languageEncoding from "detect-file-encoding-and-language";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

//  Используйте относительный путь от текущего модуля
// const contactsPath = path.resolve("./contacts.json");

const { encoding } = languageEncoding(contactsPath);

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, encoding);
    console.log(data);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const findedContact = contacts.find((contact) => contact.id === contactId);
    return findedContact || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    // console.log("contactId", contactId);
    console.log("index", index);
    if (index === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("removedContact1", removedContact);
    return removedContact;
  } catch (error) {
    console.log(error);
  }
};
const addContact = async (data) => {
  try {
    const newContact = { id: nanoid(), ...data };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact || null;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    console.log(error);
  }
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
