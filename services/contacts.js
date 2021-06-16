const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { arrayEquals } = require('../helpers/arrayEquals');
const { checkIfContactExists } = require('../helpers/checkIfContactExists');

const contactsPath = path.join('services', 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    return false;
  }
};

const getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const foundContact = contacts.find(
      contact => contact.id.toString() === contactId.toString(),
    );
    return foundContact;
  } catch (error) {
    return false;
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
    return false;
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
    console.log(newContact);
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
    return false;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    let contactUpdated = false;
    const { name, email, phone } = body;

    contacts.forEach(contact => {
      if (contact.id.toString() === contactId.toString()) {
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
        contactUpdated = true;
      }
    });
    return contactUpdated;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
