import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");

const updateContact = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

const listContacts = async () => {
  const res = await fs.readFile(contactsPath);
  return JSON.parse(res)
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const res = contacts.find(item => item.id === id);
  return res || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1);
  await updateContact(contacts)
  return result;
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
      id: nanoid(),
      name,
      email,
      phone,

  }
  contacts.push(newContact);
  await updateContact(contacts)
  return newContact;
}

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
      return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await updateContact(contacts)
  return contacts[index];
}


export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
