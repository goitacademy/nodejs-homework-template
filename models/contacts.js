const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('./models', '/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data.toString());
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  return contacts.find(({ id }) => id.toString() === contactId.toString());
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const filteredContacts = allContacts.filter(
    ({ id }) => id.toString() !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  if (
    allContacts.some(
      contact =>
        name === contact.name ||
        email === contact.email ||
        phone === contact.phone
    )
  ) {
    return null;
  }
  const newContact = { id: `${Date.now()}`, name, email, phone };
  const newContacts = [...allContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(
    ({ id }) => id.toString() === contactId.toString()
  );
  const updatedContact = { ...contact, ...body };
  const updatedAllContacts = allContacts.map(contact =>
    contact.id === contactId ? updatedContact : contact
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedAllContacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
