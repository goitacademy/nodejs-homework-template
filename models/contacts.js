const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(filePath, 'utf8');
  const parsedData = JSON.parse(data);
  return parsedData;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const contact = await getContactById(contactId);
  const filteredContacts = contacts.filter(
    contact => parseInt(contact.id) !== parseInt(contactId),
  );
  await fs.writeFile(filePath, JSON.stringify(filteredContacts), 'utf8');
  return contact;
};

async function addContact(contact) {
  const { name, email, phone } = contact;
  const id = uuidv4();
  const contacts = await listContacts();

  contacts.push({ name, email, phone, id });
  await fs.writeFile(filePath, JSON.stringify(contacts), 'utf8');
  return { id, ...contact };
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, id: contactId };
  await fs.writeFile(filePath, JSON.stringify(contacts), 'utf8');
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
