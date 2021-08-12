/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
/* eslint-disable semi */
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async id => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const oneContact = contacts.find(contact => contact.id === id);
    return oneContact;
  } catch (error) {
    throw error;
  }
};
const removeContact = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id.toString() === contactId);
  if (!contact) return;
  const newContacts = contacts.filter(({ id }) => id.toString() !== contactId);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    'utf8',
  );
  return contact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = { id: contacts.length + 1, ...body };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    'utf8',
  );
  return newContact;
};
const mongoose = require('mongoose');
require('dotenv').config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
  console.log(`Database connection error db: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database connection successful');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Database connection closed and app terminated');
  process.exit(1);
});

module.exports = db;
