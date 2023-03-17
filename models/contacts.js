const fs = require("fs/promises");
const { v4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async (req, res) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contactById = contacts.find(
    (contact) => String(contact.id) === String(contactId)
  );

  if (!contactById) {
    return null;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const i = contacts.findIndex((contact) => String(contact.id) === String(contactId));
  if (i === -1) {
    return null;
  }

  const updateContacts = contacts.filter((_, idx) => idx !== i);
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts));

  return contacts[i];
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const i = contacts.findIndex((contact) => String(contact.id) === String(id));
  if (i === -1) {
    return null;
  }
  contacts[i] = {id , ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[i];

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};