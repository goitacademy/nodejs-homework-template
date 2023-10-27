import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (err) {
    throw err;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (err) {
    throw err;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    contacts.splice(contactIndex, 1);

    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return;
  } catch (err) {
    throw err;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    contacts.push(newContact);

    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (err) {
    throw err;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    contacts[contactIndex] = {
      ...contacts[contactIndex],
      ...body,
    };
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[contactIndex];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
