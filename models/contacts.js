const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = require("path").join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  return allContacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const contact = allContacts.findIndex((contact) => contact.id === contactId);

  if (contact === -1) return null;

  const [contactsList] = allContacts.splice(contact, 1);
  console.log(contactsList);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 1));
  return contactsList;
};

const addContact = async (body) => {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 1));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  allContacts[index] = { id: contactId, ...body };
  console.log(allContacts[index]);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 1));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
