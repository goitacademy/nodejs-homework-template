const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactList = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contactList);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const resultContact = contactList.find((item) => item.id === contactId);
  return resultContact || null;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const index = contactList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return result;
};

const addContact = async (body) => {
  const contactList = await listContacts();
  const newContact = { id: nanoid(), ...body };

  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactList = await listContacts();
  const index = contactList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contactList[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return contactList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
