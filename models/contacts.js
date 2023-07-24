import fs from 'fs/promises'

import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");
console.log(contactsPath);

const updateContacts = contacts =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactById = async (id) => {
  const contactList = await listContacts();
  const contact = contactList.find((item) => item.id === id);
  return contact || null
}

// const removeContact = async (id) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }

//   const [result] = contacts.splice(index, 1);
//   await updateContacts(contacts);
//   return result;
// }

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

// const updateContact = async (id, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(item => item.id === id);
//   if (index === -1) {
//     return null
//   }
//   contacts[index] = {id, ...body};
//   await updateContacts(contacts);
//   return contacts[index]
// };

export default {
  listContacts,
  getContactById,
  // removeContact,
  addContact,
  // updateContact,
}
