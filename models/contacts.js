import * as path from 'path';
import { readFile, writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('./models', 'contacts.json');

const readContactsFile = async () => {
  try {
    const contactsJson = await readFile(contactsPath);
    const contacts = JSON.parse(contactsJson);
    return contacts;
  } catch (err) {
    console.error('Error reading contacts from file: ', err);
    throw err;
  }
};

const writeContactsFile = async data => {
  try {
    await writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing contacts to file: ', err);
    throw err;
  }
};

export const listContacts = async () => {
  try {
    const contacts = await readContactsFile();
    if (contacts) return contacts;
    if (!contacts) console.log(`No contacts found`);
    return false;
  } catch (err) {
    console.log('Error getting contact list: ', err);
    throw err;
  }
};

export const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      console.log(`There is no contact with id ${contactId} !`);
      return false;
    }
    return contacts[index];
  } catch (err) {
    console.log(`Error getting contact with id ${contactId}: `, err);
    throw err;
  }
};

export const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      console.log(`There is no contact with id ${contactId} !`);
      return false;
    }
    contacts.splice(index, 1);
    await writeContactsFile(contacts);
    console.log(`Contact with id ${contactId} removed successfully`);
    return true;
  } catch (err) {
    console.log(`Error removing contact with id ${contactId}: `, err);
    throw err;
  }
};

export const addContact = async body => {
  try {
    const contacts = await listContacts();
    if (contacts) {
      const { name, email, phone } = body;
      const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      await writeContactsFile(contacts);
      console.log('Contact has been added successfully');
      return newContact;
    }
  } catch (err) {
    console.log('Error adding new contact: ', err);
    throw err;
  }
};

export const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    if (!contacts) {
      return false;
    }
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      console.log(`There is no contact with id ${contactId} !`);
      return false;
    }
    const contact = contacts[index];
    const updatedContact = { ...contact, ...body };
    contacts[index] = updatedContact;
    await writeContactsFile(contacts);
    console.log(`Contact has been updated successfully.`);
    return updatedContact;
  } catch (err) {
    console.error('An error occurred while updating contact: ', err);
    throw err;
  }
};
