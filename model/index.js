const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const arrayEquals = require('../helpers/arrayEquals');
const checkIfContactExists = require('../helpers/checkIfContactExists');

const contactsPath = path.join('contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const foundContact = contacts.filter(
      contact => contact.id.toString() === contactId.toString(),
    );
    return foundContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactsAfterRemove = contacts.filter(
      contact => contact.id !== contactId,
    );
    if (arrayEquals(contacts, contactsAfterRemove) === false) {
      fs.writeFile(contactsPath, JSON.stringify(contactsAfterRemove), 'utf-8');
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async body => {
  const newContact = {
    id: uuidv4(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    if (checkIfContactExists(contacts, newContact) === false) {
      const contactsWithNewContact = [...contacts, newContact];
      fs.writeFile(
        contactsPath,
        JSON.stringify(contactsWithNewContact),
        'utf-8',
      );
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const { name, email, phone } = body;

    contacts.forEach(contact => {
      if (contact.id === contactId) {
        if (name) {
          contact.name = name;
        }
        if (email) {
          contact.email = email;
        }
        if (phone) {
          contact.phone = phone;
        }
        fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
        return true;
      }
    });
    return false;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
