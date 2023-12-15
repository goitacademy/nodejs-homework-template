const fs = require("fs/promises");
const nanoid = require("nanoid");

const path = require("path");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async (req, res) => {
  const contactsDB = await fs.readFile(contactPath);
  const contacts = JSON.parse(contactsDB);
  return contacts;
};

const getContactById = async (contactId) => {
  const contactsDB = await fs.readFile(contactPath);
  const contacts = JSON.parse(contactsDB);

  const el = contacts.find((contact) => contact.id === contactId);
  return el || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const findedEl = contacts.find((item) => item.id === contactId);

  if (findedEl) {
    const newArray = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactPath, JSON.stringify(newArray));
    return findedEl;
  }
  return null;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newUser = {
    name,
    email,
    phone,
    id: nanoid.nanoid(),
  };

  const contacts = await listContacts();
  contacts.push(newUser);
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return newUser;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const elContact = contacts.findIndex((item) => item.id === contactId);

  if (elContact !== -1) {
    contacts[elContact] = { id: contactId, ...body };

    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contacts[elContact];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
