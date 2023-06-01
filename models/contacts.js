const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactPath = path.join(__dirname, "contacts.json");


const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => {
      return contact.id === contactId;
  });

  if (index === -1) {
      return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactPath, JSON.stringify(contacts, 0, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}