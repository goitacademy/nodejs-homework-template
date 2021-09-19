/* eslint-disable no-useless-catch */
const { v4 } = require('uuid');

const listContacts = require('./listContacts');
const updateContacts = require('./updateContacts');

const addContact = async (name, email, phone) => {
  const data = { name, email, phone };
  try {
    const newContact = { ...data, id: v4() };
    const contacts = await listContacts();
    // const newContacts = [...contacts, newContact];

    contacts.push(newContact);

    await updateContacts(contacts);
    // console.table(newContact);
    return newContact;
  } catch (error) {
    throw error;
  }
};

module.exports = addContact;
