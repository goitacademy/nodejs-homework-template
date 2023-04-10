const fsp = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

async function getContacts() {
  const contacts = await fsp.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
}

async function updateContacts(contacts) {
  await fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  return await getContacts();
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const foundContact = contacts.find((item) => item.id === contactId);
  if (!foundContact) {
    throw new Error("The contact not found");
  }
  return foundContact;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    throw new Error("The contact not found");
  }
  const deletedContact = contacts.splice(contactIndex, 1);
  await updateContacts(contacts);
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await getContacts();
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    throw new Error("The contact not found");
  }
  contacts[contactIndex] = { id: contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
