import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = path.resolve("models", "contacts", "contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  console.log(newContact);

  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((item) => (item.id = contactId));
  if (indexContact === -1) return null;
  const contactLast = data[indexContact];
  const contactUpdate = { ...contactLast, ...body };
  data[indexContact] = contactUpdate;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[indexContact];
};

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
};
