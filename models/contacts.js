const fs = require("fs").promises;
const path = require("path");
const ID = require("nodejs-unique-numeric-id-generator");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf8"));
};

const getContactById = async (contactId) => {
  const getContacts = await listContacts();

  const data = getContacts.find(({ id }) => id === contactId);

  if (!data) {
    return null;
  }

  return data;
};

const removeContact = async (contactId) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));

  const filterContacts = await getContactById(contactId);
  if (!filterContacts) {
    return null;
  }

  const newListContscts = data.filter(({ id }) => id !== contactId);

  fs.writeFile(contactsPath, JSON.stringify(newListContscts), "utf8");

  return newListContscts;
};

const addContact = async ({ name, email, phone }) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));

  const newContacts = {
    id: ID.generate(new Date().toJSON()),
    name,
    email,
    phone,
  };

  data.push(newContacts);

  fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
  return newContacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const indexContactUpdate = contacts.findIndex(({ id }) => id === contactId);

  if (indexContactUpdate === -1) {
    console.log("NOT");
    return null;
  }

  if (body.name) {
    contacts[indexContactUpdate].name = body.name;
  }

  if (body.email) {
    contacts[indexContactUpdate].email = body.email;
  }

  if (body.phone) {
    contacts[indexContactUpdate].phone = body.phone;
  }
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[indexContactUpdate];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
