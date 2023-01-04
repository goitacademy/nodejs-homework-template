const fs = require("node:fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const pushContacts = async (contacts) => {
  try {
    const stringifyContacts = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, stringifyContacts);
  } catch (err) {
    console.log(err.message);
  }
};

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await pushContacts(newContacts);
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await fetchContacts();
    const lastId =
      Math.max(...contacts.map((contact) => parseInt(contact.id, 10))) + 1;
    const newContact = { id: lastId.toString(), name, email, phone };
    contacts.push(newContact);
    await pushContacts();
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// addContact({name: "ggggg", email: "ggg@ggg.com", phone: "444444"})
