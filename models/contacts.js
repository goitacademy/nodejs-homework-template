const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const rewriteContacts = (data) =>
  fs.writeFile(contactsPath, data, (err) => {
    if (err) console.log(err);
  });

const listContacts = async () => {
  const contacts = await getAllContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const contactById = contacts.find((contact) => contact.id === `${contactId}`);
  if (!contactById) return null;
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await getAllContacts();
  const contactToRemoveIndex = contacts.findIndex(
    (contact) => contact.id === `${contactId}`
  );
  if (contactToRemoveIndex === -1) return null;
  const filteredContacts = contacts.filter(
    (_, index) => index !== contactToRemoveIndex
  );
  rewriteContacts(JSON.stringify(filteredContacts));
  return contacts[contactToRemoveIndex];
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await getAllContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  const updatedContacts = JSON.stringify([...contacts, newContact]);
  rewriteContacts(updatedContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  let contacts = await getAllContacts();
  let updatedContact = contacts.find(
    (contact) => contact.id === `${contactId}`
  );
  if (!updatedContact) return null;
  updatedContact = {
    id: contactId,
    name,
    email,
    phone,
  };
  contacts = contacts.map((contact) =>
    contact.id !== updatedContact.id ? contact : updatedContact
  );
  const updatedContacts = JSON.stringify(contacts);
  rewriteContacts(updatedContacts);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
