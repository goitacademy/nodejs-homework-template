const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const contactsJson = await fs.readFile("./models/contacts.json", "utf8");
  return JSON.parse(contactsJson);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId.toString());
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter((contact) => {
    return contact.id !== contactId.toString();
  });
  if (filteredContacts.length === contacts.length) {
    return null;
  }
  await fs.writeFile(
    "./models/contacts.json",
    JSON.stringify(filteredContacts)
  );
  return filteredContacts;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const contactNew = { id: uuidv4(), name, email, phone };
  await fs.writeFile(
    "./models/contacts.json",
    JSON.stringify([...contacts, contactNew])
  );
  return contactNew;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.find((contact) => contact.id === contactId);
  if (!index) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));
  return { id: contactId, ...body };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
