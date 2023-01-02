const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.resolve(__dirname, 'contacts.json');

const readDb = async () => {
  const dbRaw = await fs.readFile(dbPath, 'utf8');
  const db = JSON.parse(dbRaw);
  return db;
};

const writeDb = async db => {
  await fs.writeFile(dbPath, JSON.stringify(db), 'utf8');
};

const listContacts = async () => {
  const contactsList = readDb();
  return contactsList;
};

const getContactById = async contactId => {
  const contactsList = await readDb();
  const contactsItem = contactsList.filter(({ id }) => id === contactId);
  return contactsItem;
};

const removeContact = async contactId => {
  const contactsList = await readDb();
  const updatedContactsList = contactsList.filter(({ id }) => id !== contactId);
  await writeDb(updatedContactsList);
};

const addContact = async body => {
  const { name, email, phone } = body;
  const id = uuidv4();

  const addedContactsItem = {
    id,
    name,
    email,
    phone,
  };

  const contactsList = await readDb();
  contactsList.push(addedContactsItem);
  await writeDb(contactsList);

  return addedContactsItem;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const contactsList = await readDb();

  const updatedContactsList = contactsList.map(contact => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
    return contact;
  });
  await writeDb(updatedContactsList);

  const contactsItem = updatedContactsList.find(el => el.id === contactId);
  if (!contactsItem) {
    return null;
  }
  return contactsItem;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
