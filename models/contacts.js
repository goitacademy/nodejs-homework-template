import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const reWriteContacts = contact => fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async contactId => {
  const data = await listContacts();
  const foundContact = data.find(contact => contact.id === contactId);
  return foundContact || null;
};

export const addContact = async body => {
  const contact = {
    id: nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  const data = await listContacts();
  data.push(contact);
  await reWriteContacts(data);
  return contact;
};

export const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId)

  if (index === -1) return null

  const [result] = contacts.splice(index, 1)
  await reWriteContacts(contacts);

  return result
};

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId)

  if (index === -1) return null

  const targetContact = contacts[index];
  contacts[index] = { ...targetContact, ...body };
  await reWriteContacts(contacts);

  return contacts[index];
};
