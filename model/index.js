/* eslint-disable eqeqeq */
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    return contacts
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
   try {
    const contacts= await listContacts();
    const findedContact = contacts.find(({ id }) => id == contactId);
    return findedContact;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
    try {
    const contacts = await listContacts();
    const findedContact = await getContactById(contactId);
    const filteredContacts = contacts.filter(({ id }) => id != contactId);
    await fs.writeFile(contactsPath, `${JSON.stringify(filteredContacts, null, '\t')}`)
    return findedContact;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const contacts= await listContacts();
    const contact = {
      id: uuidv4(),
      ...body
    };
    fs.writeFile(contactsPath, `${JSON.stringify([contact,...contacts], null, '\t')}`);
    return contact
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts= await listContacts();
    const findedContact = await getContactById(contactId);
    const updatedContact = Object.assign(findedContact,body);
    const updatedContacts = contacts.map((contact) => {
      return contact.id == contactId ? updatedContact : contact;
    });
    await fs.writeFile(contactsPath, `${JSON.stringify(updatedContacts, null, '\t')}`);
    return updatedContact;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
