import { Console } from "console";
import fs from "fs/promises";
import path from "path";
import * as url from "url";
import { isContactTaken } from "../validation.js";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const filteredContact = parsedContacts.filter(
    (contacts) => contacts.id === contactId
  );

  return filteredContact;
};

const removeContact = async (contactId) => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);

  const isContactExist = parsedContacts.filter(
    (element) => element.id === contactId
  );
  if (!isContactExist?.length) return 404;

  const deletedContacts = parsedContacts.filter(
    (element) => element.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(deletedContacts, null, 2));

  return 200;
};

const addContact = async (body) => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  isContactTaken(body, parsedContacts);

  parsedContacts.push(body);
  const serializedData = JSON.stringify(parsedContacts, null, 2);
  await fs.writeFile(contactsPath, serializedData);
  return parsedContacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const ContactToEdit = parsedContacts.filter(
    (element) => element.id === contactId
  );

  const dataToPut = { ...ContactToEdit[0], ...body };

  const updatedContacts = parsedContacts.map((element) => {
    if (element.id === contactId) return dataToPut;
    return element;
  });

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return dataToPut;
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
