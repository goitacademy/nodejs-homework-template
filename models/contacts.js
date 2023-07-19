import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactPath = path.resolve("models", "contacts.json");
const writeData = async (data) => {
  await fs.writeFile(contactPath, JSON.stringify(data, null, 2), "utf-8");
};

export const listContacts = async () => {
  const contacts = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(contacts);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  const [removedContact] = contacts.splice(contactIndex, 1);
  writeData(contacts);
  if (contactIndex === -1) return null;
  return removedContact;
};

export const addContact = async ({ name, phone, email }) => {
  const newContact = {
    id: nanoid(),
    name,
    phone,
    email,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  writeData(contacts);
  return newContact;
};

export const updateContact = async (contactId, { name, phone, email }) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) return null;
  contacts[contactIndex] = { id: contactId, name, phone, email };
  writeData(contacts);
  return contacts[contactIndex];
};

// Я немного поспешил и написал это до просмотра вебинара, наверное эта функция для метода PUTCH..

// export const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const contactIndex = contacts.findIndex(
//     (contact) => contact.id === contactId
//   );
//   if (contactIndex === -1) return null;
//   const updatedContact = { ...contacts[contactIndex], ...body };
//   contacts.splice(contactIndex, 1, updatedContact);
//   writeData(contacts);
//   return updatedContact || null;
// };
