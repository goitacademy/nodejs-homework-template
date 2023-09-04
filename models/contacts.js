import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");
const updateContacts = (contactsList) =>
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);}

export async function getContactById(contactId) {
  const contactsList = await listContacts();
  const contact = contactsList.find((item) => item.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  await updateContacts(contactsList);
  return result;
}

export async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);
  await updateContacts(contactsList);
  return newContact;
}

export const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;}
    contactsList[index] = {contactId,...body};
    fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
}

export default  {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
