const { json } = require("express");
const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.resolve(__dirname, "./contacts.json");


async function readContacts() {
  const contactRaw = await fs.readFile(contactsPath);
  const contact = JSON.parse(contactRaw);
  return contact;
}

async function writeContacts(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

const getContactById = async (contactId) => {
  const contactdb = await readContacts();
  const contact = contactdb.find((contact) => contact.id === contactId);

  return contact || null;
};

async function addContact({ name, email, phone }) {
  const id = shortid();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const contactdb = await readContacts();
  contactdb.push(newContact);
  await writeContacts(contactdb);
  return newContact;
}

const removeContact = async (contactId) => {
  const contactdb = await readContacts();
  const deletContact = contactdb.filter((contact) => contact.id !== contactId);
  await writeContacts(deletContact);
};

const updateContact = async (contactId, body) => {
  const contactdb = await readContacts();
  const contact = contactdb.findIndex((contact) => contact.id === contactId);
  contactdb[contact] = {... contactdb[contact] , ...body};
 await writeContacts(contactdb);
return  contactdb[contact];
};




module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
