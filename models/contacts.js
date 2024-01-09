import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

export const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}
  
export const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(i => i.id === contactId)
    return result || null;
}
  
export const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(i => i.id === contactId)
    if(index === -1){
        return null
    }
    const [result] = contacts.splice(index, 1)
    await updateContacts(contacts)
    return result;
}
  
export const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact)
    await updateContacts(contacts);
    return newContact;
}

export const updateContactById = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
      return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};