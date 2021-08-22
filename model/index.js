const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPatch = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPatch);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async contactId => {
  const id = Number(contactId) ? Number(contactId) : contactId;

  try {
    const contacts = await listContacts();
    const selectContacts = contacts.find(contact => contact.id === id);
    if (!selectContacts) {
      return null;
    }
    return selectContacts;
  } catch (error) {
    throw error;
  }
};

const removeContact = async contactId => {
  const id = Number(contactId) ? Number(contactId) : contactId;

  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === id);
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    await update(newContacts);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
};

const addContact = async body => {
  try {
    const newContact = { ...body, id: v4() };
    const contacts = await listContacts();

    contacts.push(newContact);

    await update(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  const id = Number(contactId) ? Number(contactId) : contactId;

  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === id);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { ...contacts[idx], ...body };
    await update(contacts);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
};

const update = async contacts => {
  const contactsString = JSON.stringify(contacts);
  await fs.writeFile(contactsPatch, contactsString);
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
