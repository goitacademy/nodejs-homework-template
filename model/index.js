const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  return contactsList;
};

const getContactById = async contactId => {
  const contactsList = await listContacts();
  const orderContact = contactsList.find(({ id }) => id === Number(contactId));
  if (!orderContact) {
    return null;
  }
  return orderContact;
};

const addContact = async body => {
  const contactsList = await listContacts();

  function getId(array) {
    return Math.max(...array.map(contact => contact.id + 1));
  }

  const add = { id: getId(contactsList), ...body };
  contactsList.push(add);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList));

  return add;
};

const removeContact = async contactId => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
