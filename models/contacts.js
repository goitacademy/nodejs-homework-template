import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.normalize("models/contacts.json");
const writeFile = async (data) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
  } catch (err) {
    console.message(er.message);
  }
};

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data)
  } catch (err) {
    console.message(er.message);
  };
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id === contactId);
  } catch(err){
    console.merssage(err.message)
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
    console.merssage(err.message)
  }
};

export const addContact = async ({name, email, phone}) => {
  try {
           const contacts = await listContacts();
        const newContacts = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContacts);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContacts;
  } catch (err) {
    console.merssage(err.message)
  }
};

export const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIndexUpd = contacts.findIndex(({ id }) => id === contactId);
    if (contactIndexUpd !==-1) {
      contacts[contactIndexUpd] = { id: contactId,...body};
      await writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
      return contacts[contactIndexUpd];
    } else {
      return false;
    }
  } catch(err){
    console.merssage(err.message)
  }
};

// export default {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
