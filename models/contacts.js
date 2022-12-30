const { nanoid } = require('nanoid');
const { readFile } = require('fs');
const fs = require('fs/promises');
const path = require('path');

const contactsResponse = async () => {
  const response = await fs.readFile(
    path.join(__dirname, 'contacts.json'),
    null,
    2,
    'utf-8',
  );
  return JSON.parse(response);
};

const listContacts = async () => {
  return await contactsResponse();
};

const getContactById = async id => {
  const contacts = await contactsResponse();
  const result = contacts.find(contact => contact.id === id);
  console.table(result);
  return result || null;
};

const removeContact = async id => {
  const contacts = await contactsResponse();
  const result = contacts.find(contact => contact.id === id);

  if (result) {
    const contactList = contacts.filter(contact => contact.id !== id);
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contactList, null, 2),
    );
    console.table(contactList);
    return contactList;
  }
  return null;
};

const addContact = async body => {
  const contacts = await contactsResponse();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  const contactsList = [...contacts, newContact];
  await fs.writeFile(
    path.join(__dirname, 'contacts.json'),
    JSON.stringify(contactsList, null, 2),
  );
  console.table(contactsList);
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await contactsResponse();
  const [result] = contacts.filter(contact => contact.id === id);
  if (result) {
    Object.assign(result, body);
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2),
    );
  }
  console.table(result);
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
