const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);

  return contactsList;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  const [contact] = contactsList.filter((item) => item.id === contactId);

  return contact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  const [contact] = contactsList.filter((item) => item.id === contactId);
  const NewContactList = contactsList.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(NewContactList, null, 2));

  return contact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  const newContact = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  };
  const NewContactList = [...contactsList, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(NewContactList, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  const [contact] = contactsList.filter((item) => item.id === contactId);
  const { name, email, phone } = body;
  if (name) {
    contact.name = name;
  }
  if (email) {
    contact.email = email;
  }
  if (phone) {
    contact.phone = phone;
  }

  const NewContactList = contactsList.filter((item) => {
    if (item.id !== contactId) {
      return item;
    }
    if (item.id === contactId) {
      return (item = contact);
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(NewContactList, null, 2));

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
