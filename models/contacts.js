import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "./contacts.json");
const updateContactsList = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.filter((contact) => contact.id === id);
  return result[0] || null;
};

export const removeContactById = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContactsList(contacts);
  return result;
};

export const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  contacts.push(newContact);
  await updateContactsList(contacts);
  return newContact;
};

export const updateContact = async (id, body) => {
  const outdatedContact = await getContactById(id);
  const updatedContact = {
    id: outdatedContact.id,
    name: body.name ? body.name : outdatedContact.name,
    email: body.email ? body.email : outdatedContact.email,
    phone: body.phone ? body.phone : outdatedContact.phone,
  };
  await removeContactById(id);
  await addContact(updatedContact);
  return updatedContact;
};
