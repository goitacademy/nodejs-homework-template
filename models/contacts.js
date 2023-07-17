import fs from "fs/promises";
import { nanoid } from "nanoid";

import path from "path";

const contactsPath = path.resolve("models", "contacts.json");

const updateContact = (contact) =>
  fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

// Повертаю масив контактів.
export const listContacts = async () => {
  const allCOntacts = await fs.readFile(contactsPath);
  return JSON.parse(allCOntacts);
};

// Повертаю об'єкт контакту з id за яким шукаю. Повертає null, якщо контакт з таким id не знайдений.
export const getContactById = async (contactId) => {
  const contactList = await listContacts();

  const contactById = contactList.find((contact) => contactId === contact.id);
  return contactById || null;
};

// Повертаю об'єкт видаленого контакту. Повертаю null, якщо контакт з таким id не знайдений.
export const removeContact = async (contactId) => {
  const contactList = await listContacts();

  const contactIndex = contactList.findIndex(
    (contact) => contactId === contact.id
  );
  if (contactIndex === -1) null;
  const [resultRemoveContactById] = contactList.splice(contactIndex, 1);
  await updateContact(contactList);
  return resultRemoveContactById;
};

// Повертаю об'єкт доданого контакту.
export const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const contactList = await listContacts();
  contactList.push(newContact);
  await updateContact(contactList);
  return newContact;
};

export const updateContactById = async (contactId, { name, phone, email }) => {
  const contactList = await listContacts();
  const contactIndex = contactList.findIndex(
    (contact) => contactId === contact.id
  );
  if (contactIndex === -1) {
    return null;
  }
  contactList[contactIndex] = { contactId, name, phone, email };
  await updateContact(contactList);
  return contactList[contactIndex];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
