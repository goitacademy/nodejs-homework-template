import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const contactsPath = path.join(dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const findId = data.find((contact) => contact.id === contactId);
  return findId || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const findIndex = data.findIndex((value) => value.id === contactId);
  if (findIndex === -1) {
    return;
  }
  const [result] = data.splice(findIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result || null;
};

const addContact = async (body) => {
  const data = await listContacts();
  const newItem = {
    id: nanoid(),
    ...body,
  };
  data.push(newItem);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newItem;
};

const updateContact = async (contactId, body) => {};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
