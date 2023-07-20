import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.join("db", "contacts.json");

const updateContactsStorage = (contacts) => {
  fs.writeFile(contactPath, JSON.stringify(contacts), null, 2);
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  return allContacts.find(({ id }) => id === String(contactId)) || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const index = allContacts.findIndex(({ id }) => id === String(contactId));
  if (index === -1) return null;

  const [result] = allContacts.splice(index, 1);
  await updateContactsStorage(allContacts);
  return result;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  allContacts.unshift(newContact);
  await updateContactsStorage(allContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();

  const contactIndex = allContacts.findIndex(
    ({ id }) => id === String(contactId)
  );
  if (contactIndex === -1) return null;

  allContacts[contactIndex] = {
    contactId,
    ...body,
  };

  await updateContactsStorage(allContacts);
  return allContacts[contactIndex];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
