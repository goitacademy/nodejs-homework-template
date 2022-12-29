const path = require('path');
const fs = require('fs/promises');
const {nanoid} = require('nanoid');

const contactsPath = path.resolve('src', 'models', 'contacts.json');
console.log(contactsPath);

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');

    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
};

const getById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(contacts);
    const contact = parsedContacts.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(contacts);
    const contact = parsedContacts.filter((item) => item.id !== contactId);

    const updateContacts = [...contact];
    return updateContacts;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const {name, email, phone} = body;
  try {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(contacts);
    parsedContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts), 'utf-8');
    console.log(parsedContacts);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  const {name, email, phone} = body;
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  const parsedContacts = JSON.parse(contacts);
  parsedContacts.forEach((element) => {
    if (element.id === contactId) {
      if (name) {
        element.name = name;
      }
      if (email) {
        element.email = email;
      }
      if (phone) {
        element.phone = phone;
      }
    }
  });
  return parsedContacts;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
