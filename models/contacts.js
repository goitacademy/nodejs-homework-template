/* eslint-disable no-unneeded-ternary */
const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve(__dirname, "contacts.json");;


async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(data)
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const oneContact = contacts.find((item) => item.id === contactId)
  return oneContact || null
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === contactId)
  if (index === -1) {
      return null
  }
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

async function addContact(name, email, phone) {
  const contacts = await listContacts()
  const newContact = {
      id: nanoid(),
      name,
      email,
      phone
  }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

async function updateContact(contactId, name, email, phone) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = {
    id: contactId,
    name: name ? name : contacts[index].name,
    email: email ? email : contacts[index].email,
    phone: phone ? phone : contacts[index].phone
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
