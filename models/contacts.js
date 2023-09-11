import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

export const contactPath = path.resolve("models", "contacts.json");
const updateContacts = (contacts) =>
  fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const result = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

export const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

export const updateContactsById = async (contactId, body) =>{
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === contactId)
  if(index === -1){
    return null;
  }
  contacts[index] = {...contacts[index], ...body};
  await updateContacts(contacts);
  return contacts[index]
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactsById,
};

