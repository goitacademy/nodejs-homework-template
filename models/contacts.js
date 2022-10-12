const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === String(contactId));
  console.log(contact);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (item) => item.id === String(contactId)
  );
  if (contactIndex === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (item) => item.id === String(contactId)
  );

  if (contactIndex === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(contactIndex, 1);
  const updatedContact = { ...removedContact, name, email, phone };
  contacts.push(updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
