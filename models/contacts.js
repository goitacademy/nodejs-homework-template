const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  if (contacts.filter((item) => item.id === contactId).length > 0) {
    const newContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return true;
  } else {
    return false;
  }
};

const addContact = async ({ name, email, phone }) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const id = crypto.randomBytes(16).toString("hex");
  const newContact = {
    id: id,
    name,
    email,
    phone,
  };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  if (contacts.filter((item) => item.id === contactId).length > 0) {
    const newContacts = contacts.filter((item) => item.id !== contactId);
    const newContact = {
      id: contactId,
      name,
      email,
      phone,
    };
    const newContacts2 = [...newContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts2));
    return newContact;
  } else {
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
