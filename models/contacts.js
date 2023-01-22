const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const contactsParsed = JSON.parse(contacts);
  return contactsParsed;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const findedContact = allContacts.find(({ id }) => id === String(contactId));

  if (!findedContact) return null;

  return findedContact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === String(contactId));

  if (index === -1) return null;

  const deleteContact = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return deleteContact;
};

const addContact = async (body) => {
  const newContact = { id: uuid.v4(), ...body };

  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(({ id }) => id === String(contactId));

  if (contactIndex === -1) return null;

  allContacts[contactIndex].name = name;
  allContacts[contactIndex].email = email;
  allContacts[contactIndex].phone = phone;

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return allContacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}