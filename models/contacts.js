const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("contacts");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const contactsList = JSON.parse(data);
  return contactsList;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const requestedContact = contacts.find((contact) => contact.id === contactId);
  if (!requestedContact)
    return console.error("This contact doesn't exist in your phonebook");
  return requestedContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = contacts.find((contact) => contact.id === contactId);
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2), {
    encoding: "utf-8",
  });

  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const newContact = { id: nanoid(), name, email, phone };
  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
    encoding: "utf-8",
  });
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactToUpdate = contacts.filter(
    (contact) => contact.id === contactId
  );
  if (!contactToUpdate)
    return console.error("This contact doesn't exist in your phonebook");
  const updatedContact = { ...contactToUpdate, ...body };
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  const updatedContacts = [...filteredContacts, updatedContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
    encoding: "utf-8",
  });
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
