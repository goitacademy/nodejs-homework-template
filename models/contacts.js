import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid"; //ID generator (instead of nanoid)
const contactsPath = path.join(process.cwd(), "db", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new Error(`There is no contact with id: ${contactId}`);
  }
  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const fillteredContacts = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFile(contactsPath, JSON.stringify(fillteredContacts));
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const existingContact = allContacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (existingContact) {
    throw new Error(`${newContact.name} is already in contacts list.`);
    return;
  }
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const allContacts = await listContacts();
  const existingContact = allContacts.find(
    (contact) => contact.id === contactId
  );

  if (existingContact) {
    existingContact.name = name;
    existingContact.email = email;
    existingContact.phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return existingContact;
  } else {
    const newContact = await addContact({ name, email, phone });
    return newContact;
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
