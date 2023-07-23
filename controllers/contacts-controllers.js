import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

export const listContacts = async () => {
   const data = await fs.readFile(contactsPath);
   return JSON.parse(data);   
};

export const getContactById = async (contactId) => {
   const contacts = await listContacts();
   const contact = contacts.find(item => item.id === contactId);
   return contact || null;
}

export const removeContact = async (contactId) => {
   const contacts = await listContacts();
   const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}    

export const addContact = async (data) => {
   const contacts = await listContacts();
   const newContact = {
      id: nanoid(),
      ...data,
   }
   contacts.push(newContact);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return newContact;
}

const updateContactById = async(contactId, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
   }
    contacts[index] = {contactId, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return contacts[index];
}

export default {
   listContacts,
   getContactById,
   removeContact,
   addContact,
   updateContactById
};