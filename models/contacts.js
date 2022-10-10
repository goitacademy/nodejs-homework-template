const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateContacts = async allContacts =>
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const allContacts = await listContacts();

  return allContacts.find(contact => contact.id === String(contactId)) || null;
};

const removeContact = async contactId => {
  const allContacts = await listContacts();

  const index = allContacts.findIndex(
    contact => contact.id === String(contactId)
  );

  if (index === -1) {
    return null;
  }

  const [removedContact] = allContacts.splice(index, 1);

  updateContacts(allContacts);

  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();

  const newId = Number(allContacts[allContacts.length - 1].id) + 1;

  const newContact = {
    id: String(newId),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);
  updateContacts(allContacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();

  const index = allContacts.findIndex(
    contact => contact.id === String(contactId)
  );

  if (index === -1) {
    return null;
  }

  allContacts[index] = { ...allContacts[index], ...body };

  updateContacts(allContacts);

  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
