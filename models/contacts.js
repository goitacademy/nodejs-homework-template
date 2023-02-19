const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contactList = JSON.parse(data);
    return contactList;
  } catch (error) {
    throw new Error(error);
  }
};

const getContactById = async contactId => {
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find(contact => contact.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    throw new Error(error);
  }
};

const removeContact = async contactId => {
  try {
    const contactsList = await listContacts();
    const idx = contactsList.findIndex(item => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const deletedContact = contactsList[idx];
    contactsList.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return deletedContact;
  } catch (error) {
    throw new Error(error);
  }
};

const addContact = async body => {
  try {
    const contactList = await listContacts();
    const { name, email, phone } = body;

    const duplicatedContact = contactList.some(contact => contact.email === email);
    if (duplicatedContact) {
      throw new Error(
        `Contact with email ${email} already exist. Please update if credentials was changed`
      );
    }

    const newContact = { id: v4(), name, email, phone };
    contactList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactList));

    return newContact;
  } catch (error) {
    throw new Error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsList = await listContacts();
    const idx = contactsList.findIndex(item => item.id === contactId);
    if (idx === -1) {
      return null;
    }

    const contact = contactsList.find(contact => contact.id === contactId);
    const updatedContact = { ...contact, ...body };

    contactsList.splice(idx, 1, updatedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));

    return updatedContact;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};