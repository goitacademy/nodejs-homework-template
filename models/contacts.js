const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data);
  return parsedData;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const filterContacts = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFile(contactsPath, JSON.stringify(filterContacts));
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const user = { id: uuidv4(), ...body };
  allContacts.push(user);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return user;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const newContacts = allContacts.map((contact) => {
    if (contact.id === contactId) {
      return { ...contact, ...body };
    }
    return contact;
  });
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  const contactById = newContacts.find((contact) => contact.id === contactId);
  return contactById;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
