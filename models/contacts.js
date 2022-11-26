/* eslint-disable linebreak-style */
const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const searchedContact = contacts.find((contact) =>
      contact.id === contactId);
    return searchedContact;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = [...contacts, body];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return getContactById(body.id);
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((contact) =>
      contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const updatedContact = {id: contactId, ...body};
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === contactId) {
        return (contact = updatedContact);
      } return contact;
    });
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return updatedContact;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
