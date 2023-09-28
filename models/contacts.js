
import fs from "fs/promises"
import path from "path"
import { nanoid } from "nanoid"

const contactsPath = path.resolve("models", "contacts.json")

export const listContacts = async () => {
  const results = await fs.readFile(contactsPath);
 return JSON.parse(results)
}

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
}

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1)
  return result;
}

export const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone
  }
  contacts.push(newContact);
  return newContact;

}

export const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
   if (index === -1) {
    return null;
   }
  contacts[index] = { contactId, name, email, phone }
  return contacts[index];
}

