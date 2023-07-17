import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";


const contactsPath = path.resolve('models','contacts.json');
const updateContactStorage = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const searchedContact = contacts.find(el => el.id === contactId);
  return searchedContact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(el => el.id === contactId);
   if (index === -1) {
    return null;
   }
  const [removedContact] = contacts.splice(index, 1);
  await updateContactStorage(contacts);
  return removedContact;
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone
  }
  contacts.push(newContact);
  await updateContactStorage(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
   const { name, email, phone } = body;
  const contacts = await listContacts();
  const index = contacts.findIndex(el => el.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, name, email, phone };
  await updateContactStorage(contacts);
  return contacts[index]
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}