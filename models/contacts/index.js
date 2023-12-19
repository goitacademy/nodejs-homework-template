import fs from 'fs/promises'
import path from "path";
import { nanoid } from 'nanoid';

const contactsPath = path.resolve("models","contacts", "contacts.json");

const updateListContacts = (contact) =>
  fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  
export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
   return JSON.parse(data)
}

export const getContactById = async (contactId) => {
      const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
}

export const removeContact = async (contactId) => {
   const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

export const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = {
       id: nanoid(),
  ...body,
     
       
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts,null,2))
    return newContact;}

export const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], ...body };
    await updateListContacts(contacts);
    return contacts[index];
}


