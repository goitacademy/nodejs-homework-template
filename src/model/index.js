const fs = require("fs/promises");
const { v4: generateId } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => JSON.parse(await fs.readFile(contactsPath));

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  return contact || null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);
  if (contactIdx === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: generateId(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);

  if (contactIdx === -1) {
    return null;
  }

  contacts[contactIdx] = {
    id: contactId,
    ...body,
  };

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts[contactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
