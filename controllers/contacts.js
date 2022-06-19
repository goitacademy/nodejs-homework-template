// const fs = require("fs/promises");
// const contactsPath = require("./contactsPath");
// const { v4 } = require("uuid");
const updateContacts = require("../models/updateContacts");
const { Contact } = require("../models/index");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getById = async (id) => {
  const list = await listContacts();
  const contact = list.find((item) => item.id === id);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }
  const [remove] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return remove;
};

async function addContact(body) {
  const newContact = await Contact.create(body);
  // const contacts = await listContacts();
  // const newContact = { id: v4(), ...body };
  // contacts.push(newContact);
  // await updateContacts(contacts);
  return newContact;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { ...body, id };

  await updateContacts(contacts);

  return contacts[idx];
};

const contactsOperations = {
  getById,
  removeContact,
  addContact,
  updateContact,
  listContacts,
};
module.exports = contactsOperations;
