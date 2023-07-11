// const fs = require("fs/promises");
import fs from "fs/promises";
import { nanoid } from "nanoid";

export const listContacts = async () => {
  const contacts = await fs.readFile("./models/contacts.json", "utf-8");
  return JSON.parse(contacts);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
};

export const removeContact = async (contactId) => {};

export const addContact = async ({ name, phone, email }) => {
  const newContact = {
    id: nanoid(),
    name,
    phone,
    email,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(
    "./models/contacts.json",
    JSON.stringify(contacts, null, 2),
    "utf-8"
  );
  return newContact;
};

export const updateContact = async (contactId, body) => {};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
