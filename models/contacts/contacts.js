import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

export const contactsPath = path.resolve("models", "contacts", "contacts.json");
const updateALLContacts = (allContacts) =>
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

export const getAllContacts = async () => {
  const dataGetAllContacts = await fs.readFile(contactsPath);
  return JSON.parse(dataGetAllContacts);
};

export const getContactById = async (contactId) => {
  const allContacts = await getAllContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);
  return contactById || null;
};

export const addContact = async ({ name, email, phone }) => {
  const allContacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await updateALLContacts(allContacts);
  return newContact;
};

export const updateContactById = async (contactId, body) => {
  const allContacts = await getAllContacts();
  // console.log(allContacts)
  const indexContact = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexContact === -1) {
    return null;
  }
  console.log(indexContact);
  allContacts[indexContact] = { contactId, ...body };
  await updateALLContacts(allContacts);
  return allContacts[indexContact];
};

export const removeContactById = async (contactId) => {
  const allContacts = await getAllContacts();

  const indexContact = allContacts.findIndex((item) => item.id === contactId);
  if (indexContact === -1) {
    return null;
  }
  const [result] = allContacts.splice(indexContact, 1);
  await updateALLContacts(allContacts);
  return result;
};

export default {
  getAllContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
};
