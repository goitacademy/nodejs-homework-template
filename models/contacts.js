const fs = require("node:fs/promises")
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json")

function writeContacts(contactsData) {
  return fs.writeFile(contactsPath, JSON.stringify(contactsData, undefined, 2));
}

const listContacts = async () => {
  const data =  await fs.readFile(contactsPath, {encoding: "UTF-8"})
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contactsDatas = await listContacts();
  const contactsData = contactsDatas.find(
    (contacts) => contacts.id === contactId
  );
  return contactsData
}

const removeContact = async (contactId) => {
  const contactsDatas = await listContacts();
  const index = contactsDatas.findIndex(
    (contacts) => contacts.id === contactId
  );

  if (index === -1) {
    return undefined;
  }

  const newContacts = [
    ...contactsDatas.slice(0, index),
    ...contactsDatas.slice(index + 1)
  ];

  await writeContacts(newContacts);

  return contactsDatas[index];
}

const addContact = async (body) => {
  const data = await listContacts();
  const id = crypto.randomUUID();
  const { name, email, phone } = body; 
  const newContact = {
    name,
    email,
    phone,
    id,
  };
  data.push(newContact);
  await writeContacts(data);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return undefined;
  }

  contacts[index] = { ...contacts[index], ...body };
  await writeContacts(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
