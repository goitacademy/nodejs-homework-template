const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./../../db/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(
    (el) => contactId.toString() === el.id.toString()
  );
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const cleanedContact = contacts.filter(
    (el) => contactId.toString() !== el.id.toString()
  );
  console.log(contactId);
  console.log(cleanedContact);
  const json = JSON.stringify(cleanedContact);
  fs.writeFile(contactsPath, json);
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: shortid.generate(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  const json = JSON.stringify(contacts);
  fs.writeFile(contactsPath, json);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
