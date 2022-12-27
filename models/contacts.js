import { promises as fs } from 'fs';
import path from 'path';
import { uid } from 'uid';

const contactsPath = path.resolve('./models/contacts.json');

const getContacts = async () => {
  const dbContacts = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(dbContacts);
};

const keepContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
};

const listContacts = async () => {
  try {
    const contactList = await getContacts();
    return { data: JSON.stringify(contactList), status: 'success' };
  } catch (error) {
    return { data: undefined, status: error.message };
  }
};

const getContactById = async contactId => {
  try {
    const contactList = await getContacts();
    const contact = contactList.find(({ id }) => id === contactId);

    return { data: JSON.stringify(contact), status: 'success' };
  } catch (error) {
    return { data: undefined, status: error.message };
  }
};

const addContact = async contactData => {
  try {
    const newContact = { ...contactData, id: uid(6) };
    const contactList = await getContacts();
    contactList.push(newContact);
    await keepContacts(contactList);

    return { data: JSON.stringify(newContact), status: 'success' };
  } catch (error) {
    return { data: undefined, status: error.message };
  }
};

const updateContact = async contactToUpdate => {
  const { contactId, name, phone, email } = contactToUpdate;

  try {
    const contactList = await getContacts();
    const contact = contactList.find(({ id }) => id === contactId);

    if (!contact) throw new Error('Not found');

    contactList.forEach(contact => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }
    });

    await keepContacts(contactList);

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
    const contactList = await getContacts();
    const contact = contactList.find(({ id }) => id === contactId);

    if (!contact) throw new Error('Not found');

    const updatedContactList = contactList.filter(({ id }) => id !== contactId);

    await keepContacts(updatedContactList);

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
