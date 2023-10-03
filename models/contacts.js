import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");
const updateContactList = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);

  return contact || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  const [deletedContact] = data.splice(contactIndex, 1);
  await updateContactList(data);

  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await updateContactList(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  data[contactIndex] = { id: contactId, ...body };
  await updateContactList(data);

  return data[contactIndex];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
