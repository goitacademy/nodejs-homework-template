// const fs = require('fs/promises')
const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const getContactsList = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getContactsList();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  // contacts.push(newContact); trying change for spred to change position of newContact in list to first
  const newContacts = [newContact, ...contacts];
  await updateContacts(newContacts);
  return newContact;
};

const getContactById = async contactId => {
  const contacts = await getContactsList();
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
};

const removeById = async contactId => {
  const contacts = await getContactsList();
  const indexOfRemove = contacts.findIndex(contact => contact.id === contactId);

  if (indexOfRemove === -1) {
    return null;
  }

  const [result] = contacts.splice(indexOfRemove, 1);
  await updateContacts(contacts);
  return result;
};

const updateById = async (contactId, { name, email, phone }) => {
  const contacts = await getContactsList();
  const indexOfUpdate = contacts.findIndex(contact => contact.id === contactId);

  if (indexOfUpdate === -1) {
    return null;
  }

  contacts[indexOfUpdate] = {
    id: contactId,
    name,
    email,
    phone,
  };
  await updateContacts(contacts);
  return contacts[indexOfUpdate];
};

module.exports = {
  addContact,
  getContactsList,
  getContactById,
  removeById,
  updateById,
};
