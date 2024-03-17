const fs = require("fs/promises");
const path = require("path");
const short = require("short-uuid");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  try {
    const readResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(readResult);
    return contacts;
  } catch (err) {
    console.log(err);
  }
};
const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (err) {
    console.log(err);
  }
};
const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const newContact = {
      id: short.generate(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const contact = await getContactById(contactId);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contacts.splice(index, 1, contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (err) {
    console.log(err);
  }
};
// updateContact("C9sjBfCo4UJCWjzBnOtxl", {
//   name: "Barry Allen",
//   email: "nulla.ante@vestibul.co.uk",
//   phone: "(992) 555-5555",
// });
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
