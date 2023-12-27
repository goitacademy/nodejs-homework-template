const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); //ID generator (instead of nanoid)
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new Error(`There is no contact with id: ${contactId}`);
  }
  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const fillteredContacts = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFile(contactsPath, JSON.stringify(fillteredContacts));
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const existingContact = allContacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (existingContact) {
    throw new Error(`${newContact.name} is already in contacts list.`);
    return;
  }
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
