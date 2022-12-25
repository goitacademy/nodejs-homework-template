const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (contact) {
    return contact;
  }
  return null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = await getContactById(contactId);
  const newList = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newList));
  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const contact = { id: v4(), name, email, phone };
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  let updatedContact;
  contacts.forEach((contact) => {
    if (contact.id === contactId) {
      contact.phone = phone;
      contact.email = email;
      contact.name = name;
      updatedContact = contact;
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
