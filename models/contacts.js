// declaration of variables
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");

// function get contact list
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

// function get contact by ID
const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parseData = JSON.parse(data);
  const [contactById] = parseData.filter((item) => item.id === contactId);
  return contactById;
};

// function remove contact
const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parseData = JSON.parse(data);
  const dataAfterRemove = parseData.filter((item) => item.id !== contactId);
  if (dataAfterRemove.length === parseData.length) {
    return false;
  }
  fs.writeFile(contactsPath, JSON.stringify(dataAfterRemove));
  return true;
};

// function add contact;
const addContact = async (name, email, phone) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parseData = JSON.parse(data);
  const newContact = { name, email, phone, id: String(Date.now()) };
  parseData.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(parseData));
  return newContact;
};

// function update contact
const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parseData = JSON.parse(data);
  const contactIndex = parseData.findIndex((item) => item.id === contactId);
  const contactById = parseData[contactIndex];
  if (contactIndex === -1) {
    return;
  }
  Object.assign(parseData[contactIndex], body);
  fs.writeFile(contactsPath, JSON.stringify(parseData));
  return contactById;
};

// exports functions
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
