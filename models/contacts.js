const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const contactsParse = JSON.parse(contacts);
  return contactsParse;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = await contacts.find(
    (contact) => Number(contact.id) === Number(contactId)
  );
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = await contacts.findIndex(
    (contact) => Number(contact.id) === Number(contactId)
  );

  if (index === -1) {
    return null;
  }
  const result = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  return result;
};

const addContact = async (body) => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const newContact = {
    id: Math.random().toString(),
    ...body,
  };
  const newContacts = [...JSON.parse(contacts), newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = await contacts.findIndex(
    (contact) => Number(contact.id) === Number(contactId)
  );
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
