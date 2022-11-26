import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.normalize("models/contacts.json");
const writeFile = async (data) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
  } catch (err) {
   console.log(err.message)
  }
};

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data)
  } catch (err) {
  console.log(err.message)
  };
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.filter(({ id }) => id === contactId);
  } catch(err){
  console.log(err.message)
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const removeAnyContact = contacts.filter(({ id }) => id !== contactId);
    if(removeAnyContact.length===contacts.length){
      return false;
    }
    writeFile(removeAnyContact);
    return true;
  } catch(err){
console.log(err.message)
  }
};

export const addContact = async ({name, email, phone}) => {
  try {
    const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
    };
      contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
  } catch (err) {
 console.log(err.message)
  }
};

export const updateContact = async (id, { name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const result = contacts.findIndex(({ contact }) => contact.id === id);
    if (result !==-1) {
      contacts[result] = { id,  name, email, phone };
      await writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
      return contacts[result];
    } else {
      return null;
    }
  } catch(err){
console.log(err.message)
  }
};
