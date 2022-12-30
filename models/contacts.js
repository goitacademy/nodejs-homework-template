const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, { encoding: "utf8" });
  const contacts = JSON.parse(dataString);

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contactById = contacts.find((contact) => contact.id === contactId);

  return contactById ? contactById : null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = { id: uuidv4(), name, email, phone };

  const contacts = await listContacts();

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContactById = async (contactId, body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex !== -1) {
    contacts[contactIndex].name = name;
    contacts[contactIndex].email = email;
    contacts[contactIndex].phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
