// const fs = require('fs/promises')
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const contactsPath = path.resolve(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const allContacts = await listContacts();
    const changedCollection = allContacts.filter(({ id }) => id !== contactId);
    updateContact(changedCollection);
    return allContacts.filter(({ id }) => id === contactId);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async body => {
  try {
    let name;
    let email;
    const phone = body;
    const newContact = { id: randomUUID(), name: name, email: email, phone: phone };
    const allContacts = await listContacts();
    const changedCollection = [...allContacts, newContact];
    updateContact(changedCollection);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(path.join(contactsPath), JSON.stringify(contacts, null, 2));
    return updatedContact;
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
