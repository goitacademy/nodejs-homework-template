const contactsPath = './models/contacts.json';
const shortid = require('shortid');
const fs = require('fs/promises');

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(list);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async contactId => {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsList);
    const searchContacts = contacts.filter(el => el.id === contactId);
    if (searchContacts.length > 0) return searchContacts;
    else return null;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async contactId => {
  let searchContacts = [];
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsList);
    contacts.map(el => {
      if (el.id === contactId) {
        searchContacts = contacts.filter(el => el.id !== contactId);
      }
      return searchContacts;
    });
    if (searchContacts.length > 0) {
      fs.writeFile(contactsPath, JSON.stringify(searchContacts));
    } else return null;
  } catch (err) {
    console.log(err);
  }
  listContacts();
};

const addContact = async ({ name, email, phone }) => {
  try {
    const id = shortid.generate();
    const newUser = {
      id,
      name,
      email,
      phone,
    };

    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsList);
    contacts.push(newUser);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newUser;
  } catch (err) {
    console.log(err);
  }
  listContacts();
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
