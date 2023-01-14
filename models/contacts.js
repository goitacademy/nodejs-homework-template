const fs = require("node:fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const pushContacts = async (contacts) => {
  try {
    const stringifyContacts = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, stringifyContacts);
  }
  catch (err) {
    console.log(err.message);
  }
};

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  }
  catch (err) {
    console.log(err.message);
  }
};

const generateNewContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const lastId =
      Math.max(...contacts.map((contact) => parseInt(contact.id, 10))) + 1;
    return { id: lastId.toString(), name, email, phone };
  }
  catch (err) {
    console.log(err.message);
  }
};

const getUpdatedContact = async (contact, body) => {
  const { name, email, phone } = body;
  return {
    ...contact,
    name: name ? name : contact.name,
    email: email ? email : contact.email,
    phone: phone ? phone : contact.phone,
  };
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  }
  catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = await contacts.filter(
      (contact) => contact.id !== contactId
    );
    await pushContacts(newContacts);
  }
  catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  try {
    if (!body) return;
    const contacts = await listContacts();
    const newContact = await generateNewContact(body);
    await contacts.push(newContact);
    await pushContacts(contacts);
  }
  catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contact = await getContactById(contactId);
    const updatedContact = await getUpdatedContact(contact, body);
    const indexOfContact = await contacts.findIndex(
      (contact) => contact.id === contactId
    );
    await contacts.splice(indexOfContact, 1, updatedContact);
    await pushContacts(contacts);
  }
  catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  generateNewContact,
  getUpdatedContact,
};