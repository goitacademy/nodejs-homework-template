const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const pathFile = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(pathFile, { encoding: "utf-8" });

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findedContact = contacts.find((contact) => contact.id === contactId);

  return findedContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return undefined;
  }

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await fs.writeFile(pathFile, JSON.stringify(newContacts), undefined, 2);

  return newContacts;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: crypto.randomUUID() };
  contacts.push(newContact);

  await fs.writeFile(pathFile, JSON.stringify(contacts), undefined, 2);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return { message: "Not found" };
  }

  if (body.name) {
    contacts[index].name = body.name;
  }

  if (body.email) {
    contacts[index].email = body.email;
  }

  if (body.phone) {
    contacts[index].phone = body.phone;
  }

  await fs.writeFile(pathFile, JSON.stringify(contacts), undefined, 2);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
