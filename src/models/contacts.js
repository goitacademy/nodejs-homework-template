const path = require('path');
const fs = require('fs/promises');
const {nanoid} = require('nanoid');

const contactsPath = path.resolve('src', 'models', 'contacts.json');

const readContactsList = async () => {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
};

const writeContactsList = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await readContactsList();
  return contacts;
};

const getById = async (contactId) => {
  const contacts = await readContactsList();
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readContactsList();
  const db = contacts.filter((item) => item.id !== contactId);
  console.log(db);
  await writeContactsList(db);
};

const addContact = async (body) => {
  const {name, email, phone} = body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await readContactsList();
  contacts.push(newContact);
  await writeContactsList(contacts);
};

const updateContact = async (contactId, body) => {
  const {name, email, phone} = body;
  const contacts = await readContactsList();
  contacts.forEach((element) => {
    if (element.id === contactId) {
      if (name) {
        element.name = name;
      }
      if (email) {
        element.email = email;
      }
      if (phone) {
        element.phone = phone;
      }
    }
  });
  await writeContactsList(contacts);
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
