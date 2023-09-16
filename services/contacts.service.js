const fs = require("fs/promises");
// const { nanoid } = require("nanoid");
const path = require("path");

const relativePath = "../data/contacts.json";
const contactsPath = path.join(__dirname, relativePath);

// console.log(__dirname);
// console.log(contactsPath);

const listContacts = async () => {
  const jsondata = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(jsondata);
  return parsedData;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const searchedContact = contacts.find((contact) => contactId === contact.id);
  console.log(searchedContact);
  return searchedContact;
};

const removeContact = async (contactId) => {
  console.log("delete test", contactId);
  const contacts = await listContacts();
  console.log("l", contacts.length);
  const removedContact = contacts.find((contact) => contact.id === contactId);
  const filteredList = contacts.filter((contact) => contact.id !== contactId);
  console.log("l2", filteredList.length);
  await fs.writeFile(contactsPath, JSON.stringify(filteredList));
  console.log("deleted contact:", removedContact);
  return filteredList;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: Math.floor(Math.random() * 10000000000).toString(),
    name: name,
    email: email,
    phone: phone,
  };
  const updatedList = [...contacts, newContact];
  fs.writeFile(contactsPath, JSON.stringify(updatedList));
  console.log("added new contact:", newContact);
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
