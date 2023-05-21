const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

const getContactsService = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactService = async (id) => {
  const contacts = await getContactsService();
  return contacts.find((contact) => contact.id === id);
};

const createContactService = async (data) => {
  const contacts = await getContactsService();
  const newContact = { id: crypto.randomUUID(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContactService = async (id, body) => {
  const contacts = await getContactsService();
  const contact = contacts.findIndex((el) => el.id === id);
  if (contact === -1) {
    return null;
  }
  const updatedContact = {
    id: id,
    ...body,
  };
  contacts.splice(contact, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

const deleteContactService = async (id) => {
  const contacts = await getContactsService();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    throw new Error("Cannot delete");
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return id;
};

module.exports = {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
};
