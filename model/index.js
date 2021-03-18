const fs = require('fs/promises');
const shortid = require('shortid');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    return data;
  });
  return JSON.parse(contactsList);
};

const getContactById = async contactId => {
  const contactsList = await listContacts();

  const filteredData = contactsList.find(item => String(item.id) === contactId);
  return filteredData;
};

const removeContact = async contactId => {
  const contactsList = await listContacts();

  const removedContact = contactsList.find(item => String(item.id) === contactId);
  const filteredContacts = JSON.stringify(contactsList.filter(item => String(item.id) !== contactId));
  await fs.writeFile(contactsPath, filteredContacts, err => {
    if (err) throw err;
  });
  return removedContact;
};

const addContact = async body => {
  const contactsList = await listContacts();

  const newContact = { id: shortid.generate(), ...body };
  const newContactsArr = JSON.stringify([...contactsList, newContact]);
  await fs.writeFile(contactsPath, newContactsArr, err => {
    if (err) throw err;
  });
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();

  const contact = contactsList.find(item => String(item.id) === contactId);
  const updatedContact = { ...contact, ...body };
  const updatedContactList = JSON.stringify(contactsList.map(item => (String(item.id) === contactId ? updatedContact : item)));

  await fs.writeFile(contactsPath, updatedContactList, err => {
    if (err) throw err;
  });
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
