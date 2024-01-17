import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const updateContact = (contacts) =>
fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const contactsPath = path.resolve("models", "contacts.json");

// Повертає масив контактів.
export const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  return result;
}

// Повертає об'єкт доданого контакту.
export const addContact = async (body) => {
  const contacts = await listContacts();
  const {name, email, phone} = body
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
}

export const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
      return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await updateContact(contacts);
  return contacts[index];
}
















