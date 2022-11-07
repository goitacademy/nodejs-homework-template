const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath);
  const contatcs = JSON.parse(contactsRaw);
  return contatcs;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const cId = contactId.toString();
  const contactToShow = contacts.find((contact) => contact.id === cId);
  return contactToShow;
};

const removeContact = async (contactId) => {
  const contatcs = await listContacts();
  const cId = contactId.toString();
  const contactToRemove = contatcs.find((contact) => contact.id === cId);
  if (!contactToRemove) {
    return null;
  }
  const newContactsList = contatcs.filter((contact) => contact.id !== cId);
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
  return newContactsList;
};

const addContact = async (body) => {
  const contatcs = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contatcs.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contatcs));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const cId = contactId.toString();
  const contactToUpdate = contacts.find((contact) => contact.id === cId);
  if (!contactToUpdate) {
    return null;
  } else {
    if (name) {
      contactToUpdate.name = name;
    }
    if (email) {
      contactToUpdate.email = email;
    }
    if (phone) {
      contactToUpdate.phone = phone;
    }
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contactToUpdate;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
