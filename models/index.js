import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
     return JSON.parse(data)
}

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
 return result || null;
}

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

export const removeContact = async (id) => {
  const contacts = await listContacts();
      const index = contacts.findIndex((contact) => contact.id === id);
      if (index === -1) {
          return null;
}
  const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

export const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if(index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await updateContacts(contacts);
  return contacts[index];
}
