import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

function updateContactsStorage(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// Повертає масив контактів.
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContactsStorage(contacts);
  return result;
}

// Повертає об'єкт доданого контакту.
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    phone,
    email,
  };
  contacts.push(newContact);
  await updateContactsStorage(contacts);
  return newContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};