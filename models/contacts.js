const fs = require("fs").promises;
const { v4 } = require("uuid");
const getContacts = require("../helpers/getContacts");
const writeContacts = require("../helpers/writeContacts");


const listContacts = async () => {
  const contacts = await getContacts();
  return contacts;
};

const getById = async (contactId) => {
  const contacts = await getContacts();
  const newContact = contacts.find((elem) => elem.id === contactId);
  if (!newContact) {
    return null;
  }
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const removedContact = contacts.find((elem) => elem.id === contactId);
  if (!removedContact) {
    return null;
  }
  const newContacts = contacts.filter((elem) => elem.id !== contactId);
  await writeContacts(newContacts);
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getContacts();
  const newContact = { id: v4(), name, email, phone };
  const newContacts = [...contacts, newContact];
  await writeContacts(newContacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await getContacts();
  const newContact = contacts.find((elem) => elem.id === contactId) || null;
  const newContacts = contacts.map(elem=>{
    if(elem.id === contactId) {
      elem.name = name;
      elem.email = email;
      elem.phone = phone;
    }
    return elem
  })
  await writeContacts(newContacts);
  return newContact;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};

// {
//     "id": "AeHIrLTr6JkxGE6SN-0Rw",
//     "name": "Allen Raymond",
//     "email": "nulla.ante@vestibul.co.uk",
//     "phone": "(992) 914-3792"
//   }
