const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((el) => el.id === contactId);
  return result || "Not Found. Try again";
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const listOfContacts = JSON.parse(contacts);
  const index = listOfContacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return "Not Found";
  }
  const [contact] = listOfContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: nanoid() };
  contacts.push(newContact);
  // await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
