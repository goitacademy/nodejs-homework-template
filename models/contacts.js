const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// const contactsPath = path.resolve('contacts.json');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(result);

    return contacts;
  } catch (err) {
    console.log('Something went wrong: ', err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((person) => person.id === contactId);

    return contact;
  } catch (err) {
    console.log('Something went wrong: ', err.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = {
      id: uuidv4(),
      ...body,
    };

    const contacts = await listContacts();

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (err) {
    console.log('Something went wrong: ', err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const index = contacts.findIndex((contact) => contact.id === contactId);

    const deletedContact = contacts[index];

    if (deletedContact !== -1) {
      contacts.splice(index, 1);

      await fs.writeFile(contactsPath, JSON.stringify(contacts));

      return deletedContact;
    } else {
      return null;
    }
  } catch (err) {
    console.log('Something went wrong: ', err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;

    const contacts = await listContacts();

    const indexContact = contacts.findIndex(
      (person) => person.id === contactId
    );
    console.log('---> ~ updateContact ~ indexContact:', indexContact);

    if (indexContact !== -1) {
      contacts[indexContact].name = name;
      contacts[indexContact].email = email;
      contacts[indexContact].phone = phone;

      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return contacts[indexContact];
    } else {
      return null;
    }
  } catch (err) {
    console.log('Something went wrong: ', err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
