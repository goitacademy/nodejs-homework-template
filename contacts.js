const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");



const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

async function getContactById(id) {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === id);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const contactToRemove = contacts.find((el) => el.id === id);
  const contactsWithoutRemoved = contacts.filter((el) => el.id !== id);
  if (!contactsWithoutRemoved) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(contactsWithoutRemoved));
  return contactToRemove;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
