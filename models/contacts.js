const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(`${__dirname}`, 'contacts.json');

const updateFile = async contacts =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const list = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getById = async contactId => {
  const allContacts = await list();
  const searchedContact = allContacts.find(({ id }) => contactId === id);
  return searchedContact || null;
};

const remove = async contactId => {
  const allContacts = await list();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  const [contact] = allContacts.splice(index, 1);
  await updateFile(allContacts);
  return contact;
};

const add = async body => {
  const allContacts = await list();
  const newContact = { id: nanoid(), ...body };
  allContacts.push(newContact);
  await updateFile(allContacts);
  return newContact;
};

const update = async (contactId, body) => {
  const allContacts = await list();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  allContacts[index] = { id: contactId, ...body };
  await updateFile(allContacts);
  return allContacts[index];
};

module.exports = {
  list,
  getById,
  remove,
  add,
  update,
};
