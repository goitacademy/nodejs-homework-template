const fs = require('fs/promises')
const path = require("path");
const { nanoid } = require("nanoid");
require("colors");

const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contactsArr = await listContacts();
  const findContactId = contactsArr.find(
    (contact) => contact.id === contactId);
  return findContactId;

}

const removeContact = async (contactId) => {
  const contactsArr = await listContacts();
  const newArrContacts = contactsArr.filter(
    (contact) => contact.id !== contactId);
  return newArrContacts;
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    return null;
  }
  const contactsArr = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const updatedContacts = [newContact, ...contactsArr];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
    encoding: "utf-8",
  });
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contactsArr = await listContacts();
  const contactToUpdate = contactsArr.find((contact) => contact.id === contactId);
  if (!contactToUpdate) {
    return null;
  };
  const otherContacts = contactsArr.filter(
    (contact) => contact.id !== contactId);
  const updatedContact = {
    ...contactToUpdate,
    ...body,
  };
  const contactsToSave = [...otherContacts, updatedContact];
  await fs.writeFile(contactsPath, JSON.stringify(contactsToSave, null, 2), {
    encoding: "utf-8",
  });
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
