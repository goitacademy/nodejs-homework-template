const fs = require('fs');
const path = require('path')
const contactsDirectory = path.join(__dirname, 'contacts.json')
const Joi = require('joi')


function listContacts() {
  const contactsData = fs.readFileSync(contactsDirectory);
  const contacts = JSON.parse(contactsData);
  return contacts;
}

function getById(id) {
  const contactsData = fs.readFileSync(contactsDirectory);
  const contacts = JSON.parse(contactsData);
  
  const contact = contacts.find((c) => c.id === id);
  return contact;
}

function addContact(contact) {
  const contactsData = fs.readFileSync(contactsDirectory);
  const contacts = JSON.parse(contactsData);
  contacts.push(contact);
  fs.writeFileSync(contactsDirectory, JSON.stringify(contacts));
}

function removeContact(id) {
  const contactsData = fs.readFileSync(contactsDirectory);
  let contacts = JSON.parse(contactsData);
  const contactIndex = contacts.findIndex((c) => c.id === id);
  if (contactIndex !== -1) {
    const contact = contacts.splice(contactIndex, 1)[0];
    fs.writeFileSync(contactsDirectory, JSON.stringify(contacts));
    return contact;
  }
  return null;
}

function updateContact(id, value) {
  const contactsData = fs.readFileSync(contactsDirectory);
  let contacts = JSON.parse(contactsData);
  const contactIndex = contacts.findIndex((c) => c.id === id);
  if (contactIndex !== -1) {
    contacts[contactIndex] = { ...contacts[contactIndex], ...value };
    fs.writeFileSync(contactsDirectory, JSON.stringify(contacts));
    return contacts[contactIndex];
  }
  return null;
}








module.exports = { listContacts, getById, addContact, removeContact, updateContact };
