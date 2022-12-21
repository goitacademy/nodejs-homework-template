// const fs = require('fs/promises')
import { promises as fs } from 'fs';
import path from 'path';
import { uid } from 'uid';

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const contactList = await fs.readFile(contactsPath, 'utf8');
    return { data: contactList, status: 'success' };
  } catch (error) {
    return { data: undefined, status: error.message };
  }
};

const getContactById = async contactId => {
  try {
    const contactList = await fs.readFile(contactsPath, 'utf8');
    const contact = JSON.parse(contactList).find(({ id }) => id === contactId);

    return { data: JSON.stringify(contact), status: 'success' };
  } catch (error) {
    return { data: undefined, status: error.message };
  }
};

const addContact = async contactData => {
  try {
    const newContact = { ...contactData, id: uid(6) };

    const contactListData = await fs.readFile(contactsPath, 'utf8');
    const contactList = JSON.parse(contactListData);
    contactList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactList), 'utf8');

    return { data: JSON.stringify(newContact), status: 'success' };
  } catch (error) {
    return { data: undefined, status: error.message };
  }
};

const updateContact = async contactToUpdate => {
  const { contactId, name, phone, email } = contactToUpdate;

  try {
    const contactListData = await fs.readFile(contactsPath, 'utf8');
    const contactList = JSON.parse(contactListData);

    const contact = contactList.find(({ id }) => id === contactId);

    if (!contact) return;

    contactList.forEach(contact => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(contactList), 'utf8');

    return {
      data: JSON.stringify(contactToUpdate),
      status: 'success',
    };
  } catch (error) {
    return { data: undefined, status: error.message };
  }
};

const removeContact = async contactId => {
  try {
    const contactListData = await fs.readFile(contactsPath, 'utf8');
    const contactList = JSON.parse(contactListData);
    const contact = contactList.find(({ id }) => id === contactId);

    if (!contact) throw new Error('Not found');

    const updatedContactList = contactList.filter(({ id }) => id !== contactId);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContactList),
      'utf8'
    );

    return { data: JSON.stringify(contact), status: 'success' };
  } catch (error) {
    return { data: undefined, status: error.message };
  }
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
