import fs from "fs/promises";
import path from "path";
// const path = require('path');
import { nanoid } from "nanoid";
const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  // ...твой код. Возвращает массив контактов.
  const data = await fs.readFile(contactsPath);
  // JSON.parse(data) возвращает JavaScript Object!
  return JSON.parse(data);
};

const getContactById = async (id) => {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  const contactId = String(id);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (id) => {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  const contactId = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return result;
};

const addContact = async (data) => {
  // ...твой код. Возвращает объект добавленного контакта.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  // await updateContact(contacts);
  return newContact;
};

const updateContactById = async (id, data) => {
  const contactId = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  // contacts[index] = { id, ...data };
  contacts[index] = { ...contacts[index], ...data };

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
