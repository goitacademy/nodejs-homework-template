const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === contactId) || null;
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return null;
  }

  const removedContact = contacts[idx];
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = { id: v4(), name, email, phone };
  const contacts = await listContacts();

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  let contact = contacts.find(
    (contact) => contact.id.toString() === contactId.toString()
  );
  if (contact) {
    contact = { ...contact, ...body };
    contacts.forEach((cont, index) => {
      if (cont.id.toString() === contact.id.toString()) {
        contacts[index] = contact;
      }
    });
  }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
