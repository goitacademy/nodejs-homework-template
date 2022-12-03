const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id.toString() === contactId.toString()
  );
  if (!contact) return null;
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const newContacts = contacts.filter(
    (contact) => contact.id.toString() !== contactId.toString()
  );
  const contact = contacts.find(
    (contact) => contact.id.toString() === contactId.toString()
  );
  await fs.writeFile(filePath, JSON.stringify(newContacts));
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(filePath, JSON.stringify(newContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contactId.toString() === contact.id.toString()
  );
  if (index === -1) return null;
  const newContacts = contacts.map((contact) =>
    contactId.toString() === contact.id.toString()
      ? { id: contactId.toString(), ...body }
      : contact
  );
  await fs.writeFile(filePath, JSON.stringify(newContacts));
  return newContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
