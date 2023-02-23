const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  try {
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  try {
    const contacts = JSON.parse(data);
    const contactById = contacts.find((contact) => contact.id === contactId);
    console.log(contactById);
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  try {
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    console.log(newContacts);
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  const data = await fs.readFile(contactsPath, "utf8");
  try {
    const contacts = JSON.parse(data);
    const id = contacts.length + 1;

    const contact = { id, name, email, phone };

    contacts.push(contact);
    console.log(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await fs.readFile(contactsPath, "utf8");
  try {
    const contacts = JSON.parse(data);
    const contactById = contacts.find((contact) => contact.id === contactId);

    const idx = contacts.indexOf(contactById);
    contacts[idx].name = name;
    contacts[idx].email = email;
    contacts[idx].phone = phone;

    console.log(contacts[idx]);
    console.log(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
